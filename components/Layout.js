import React from 'react';
import { connect } from 'react-redux';

const Layout = (props) => {
  return ( <React.Fragment>
    <h1>header</h1>
    authenticated: {props.authenticated.toString()}
    {props.children}
    <h1>footer</h1>
  </React.Fragment> );
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.token !== null
  }
}
 
export default connect(mapStateToProps)(Layout);
