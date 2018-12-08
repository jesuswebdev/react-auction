import React from "react";
import { Formik, Form, Field } from "formik";
import http from "axios";
import { API_URL } from "../../config";

class Register extends React.Component {
  state = {
    error: false
  };

  sendData = (values, submitting) => {
    this.setState({ error: false }, async () => {
      try {
        const { data } = await http.post(`${API_URL}/account`, values);
        console.log(data);
        submitting(false);
      } catch (error) {
        this.setState({ error: true }, () => {
          submitting(false);
        });
      }
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, {setSubmitting }) => {
          this.sendData(values, setSubmitting);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <h1>form</h1>
            {isSubmitting && <p>Submitting...</p>}
            <Field type="text" name="name" />
            <Field name="email" />
            <Field name="password" />
            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default Register;
