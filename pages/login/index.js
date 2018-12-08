import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import http from "axios";
import { API_URL } from "../../config";
import { loginSuccess } from '../../store/user/actions';

class Login extends React.Component {
  state = { error: false };

  sendData = (values, submitting) => {
    this.setState({ error: false }, async () => {
      try {
        const { data } = await http.post(`${API_URL}/account/login`, values);
        this.props.loginSuccess(data);
        submitting(false);
      } catch (error) {
        submitting(false);
      }
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          this.sendData(values, setSubmitting);
        }}>
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <p>{`User ID: ${this.props.userId || 'Not logged in'}`}</p>
            {isSubmitting && <p>submitting...</p>}
            <Field type='email' name='email' />
            <Field type='password' name='password' />
            <button type='submit'>send</button>
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: (data) => { dispatch(loginSuccess(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
