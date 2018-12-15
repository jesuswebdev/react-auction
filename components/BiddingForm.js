import React from "react";
import { Input, Form as AntForm, Button, message } from "antd";
import { Formik, Field, Form as FormikForm } from "formik";
import http from "axios";
import * as Yup from "yup";
import { API_URL } from "../config";
import { getAuthHeaders } from "../utils";

const Search = Input.Search;
const FormItem = AntForm.Item;

class BiddingForm extends React.Component {
  bid = async (auctionId, amount, submitting) => {
    const bidMessage = message.loading("Submitting bid", 0);
    try {
      const { data } = await http.post(
        `${API_URL}/auction/${auctionId}/bid`,
        amount,
        { headers: getAuthHeaders() }
      );
      submitting(false);
      bidMessage();
    } catch (error) {
      submitting(false);
      bidMessage();
      console.log(error.response.data.message);
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ amount: "" }}
        validationSchema={Yup.object().shape({
          amount: Yup.number()
            .integer("The amount must be an integer")
            .min(this.props.currentBid + 1, "Your bid is not valid")
            .required("Bid cannot be empty")
        })}
        onSubmit={(values, { setSubmitting }) => {
          this.bid(this.props.auction, values, setSubmitting);
        }}>
        {({ handleSubmit, isSubmitting }) => (
          <FormikForm onSubmit={handleSubmit}>
            <Field
              name='amount'
              render={({ field, form: { errors, touched } }) => (
                <FormItem
                  validateStatus={
                    touched.amount && errors.amount
                      ? "error"
                      : touched.amount && !errors.amount
                      ? "success"
                      : ""
                  }
                  help={touched.amount && errors.amount}>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Your bid'
                    addonAfter={
                      <Button
                        htmlType='submit'
                        type='primary'
                        block
                        disabled={isSubmitting}>
                        Bid
                      </Button>
                    }
                    style={{ maxWidth: "200px" }}
                    disabled={isSubmitting}
                  />
                </FormItem>
              )}
            />
          </FormikForm>
        )}
      </Formik>
    );
  }
}

export default BiddingForm;
