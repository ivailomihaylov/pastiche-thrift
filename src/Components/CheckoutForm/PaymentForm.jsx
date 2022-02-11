import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import Review from "./Review";

const PaymentForm = ({
  checkoutToken,
  shippingData,
  handleCaptureCheckout,
  backStep,
  nextStep,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "International",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242 4242 4242 4242",
          expiry_month: "11",
          expiry_year: "2024",
          cvc: "123",
          postal_zip_code: "90089",
        },
      },
    };

    handleCaptureCheckout(checkoutToken.id, orderData);

    nextStep();
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Typography variant="body2">Наложен платеж</Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Плащане на {checkoutToken.live.subtotal.raw} лв
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
