import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Layout, Menu, Row, Col } from 'antd';

const { Header } = Layout;
const { SubMenu } = Menu;

const AppHeader = (props) => {
  return (
    <Header>
      <Row>
        <Col span={8}>
          <Link href="/" passHref>
            <div style={{color: 'white', width: '100px', textAlign: 'center', cursor: 'pointer'}}>React Auction</div>
          </Link>
        </Col>
        <Col>
          <Menu theme="dark"
          mode="horizontal"
          style={{lineHeight: '64px'}}>
            <SubMenu title={props.user.name} style={{float: 'right'}}>
              <Menu.Item>
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user || {}
  }
}
 
export default connect(mapStateToProps)(AppHeader);
