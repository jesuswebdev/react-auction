import React from 'react'
import {connect} from 'react-redux';
import http from 'axios';
import { Row, Col, Card } from 'antd';
import { API_URL } from '../config';
import AuctionCardItem from '../components/AuctionCardItem';

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    let top;
    let newest;
    try {
      const {data: topAuctions} = await http.get(`${API_URL}/auction?limit=4&filter=top`);
      const {data: newestAuctions} = await http.get(`${API_URL}/auction?limit=4&filter=new`);
      top = topAuctions;
      newest = newestAuctions;      
    } catch (error) {
      top = 'There was an error...';
      newest = 'There was an error...';
    }
    return {top, newest};
  }

  render () {
    return (
      <React.Fragment>
        <h1 style={{textAlign: 'center'}}>Top Auctions </h1>
        <Row type="flex" justify="center" gutter={16}>
          {this.props.top.map((item) => (
            <Col xs={22} md={5} key={item._id}>
              <AuctionCardItem item={item} />
            </Col>
          ))}
        </Row>
      </React.Fragment>
    )
  }
}

export default connect()(Index)
