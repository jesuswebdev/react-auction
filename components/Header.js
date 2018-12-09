import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <div style={{color: 'white'}}>React Auction</div>
      <Menu theme="dark"
      mode="horizontal"
      style={{lineHeight: '64px'}}>
        
      </Menu>
    </Header>
  );
}
 
export default AppHeader;
