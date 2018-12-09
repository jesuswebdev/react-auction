import React from "react";
import { Layout } from "antd";
import Footer from "./Footer";
import Header from "./Header";

const { Content } = Layout;

class AppLayout extends React.Component {
  state = {
    minHeight: 512,
    padding: "32px"
  };

  setHeight = () => this.setState({ minHeight: window.innerHeight - 133 });

  componentDidMount() {
    this.setHeight();
    window.addEventListener("resize", this.setHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
  }

  render() {
    return (
      <Layout>
        <Header />
        <Content style={this.state}>{this.props.children}</Content>
        <Footer />
      </Layout>
    );

  }
};
export default AppLayout;
