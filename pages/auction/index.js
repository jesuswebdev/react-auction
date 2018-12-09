import React from 'react';
import http from 'axios';
import { Card, Row, Col } from 'antd';
import { API_URL } from '../../config';

class Auction extends React.Component {
  static async getInitialProps({query: {id}}) {
    let auction;
    try {
      const {data} = await http.get(`${API_URL}/auction/${id}`);
      auction = data;
    } catch (error) {
      console.log(error);
    }
    return {auction}
  }

  componentDidMount() {
    
  }
  
  render() { 
    const {auction} = this.props;
    return (<Row type="flex" justify="center" gutter={24}>
      <Col xs={22} md={11}>
        <img src={auction.img} alt="img" />
      </Col>
      <Col xs={22} md={11}>
        <Card title={auction.title}>
          <p>{auction.description}</p>
        </Card>
      </Col>
    </Row>);
  }
}
 
export default Auction;
