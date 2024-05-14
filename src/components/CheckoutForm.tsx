import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEventHandler, useEffect, useState } from "react";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import OrderSummary from "@/components/OrderSummary";
import { SLAData } from "@/interfaces";

export const CheckoutForm = (props: {
  items: {
    title: string;
    basePrice: number;
    modifiers?: SLAData[];
    total: number;
    note?: string;
    location?: string;
  }[];
  grandTotal: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Grid container component="form" id="payment-form" onSubmit={handleSubmit} spacing={4}>
      <Grid item xs={12} md={6}>
        <OrderSummary items={props.items} grandTotal={props.grandTotal} />
      </Grid>
      <Grid item xs={12} md={6}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button disabled={isLoading || !stripe || !elements} type="submit" sx={{ mt: "1rem" }} variant="contained">
          <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </Grid>
    </Grid>
  );
};
