import React from "react";
import http from "axios";
import { Client } from "nes";
import { Card, Row, Col } from "antd";
import { API_URL, API_WS_URL } from "../../config";
import BidsTable from "../../components/BidsTable";

class Auction extends React.Component {
  static async getInitialProps({ query: { id } }) {
    let auction;
    try {
      const { data } = await http.get(`${API_URL}/auction/${id}`);
      auction = data;
    } catch (error) {
      console.log(error);
      auction = {};
    }
    return { auction };
  }

  state = {
    bids: this.props.auction.bids.slice(0,9),
    current_bid: this.props.auction.current_bid,
    client: undefined
  };

  async componentDidMount() {
    const ws = new Client(API_WS_URL);
    this.setState({ client: ws });
    const handler = (data, flag) => {
      this.setState(prevState => {
        return {
          bids: [data, ...prevState.bids.slice(0, 8)],
          current_bid: data
        };
      });
    };

    try {
      await ws.connect();
      ws.subscribe(`/auction/${this.props.auction._id}`, handler);
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    let client = this.state.client;
    client.unsubscribe(`/auction/${this.props.auction._id}`);
  }

  render() {
    const { auction } = this.props;
    return (
      <React.Fragment>
        <Row type='flex' justify='center' gutter={24}>
          <Col xs={22} md={11}>
            <img src={auction.img} alt='img' />
          </Col>
          <Col xs={22} md={11}>
            <Card title={auction.title}>
              <p>{auction.description}</p>
              <p>{`Current Bid: $${(this.state.current_bid || {}).amount || 0}`}</p>
            </Card>
          </Col>
        </Row>
        <Row type='flex' justify='center'>
          <Col span={22}>
            <BidsTable bids={this.state.bids} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Auction;
