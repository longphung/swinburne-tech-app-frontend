/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import Box from "@mui/material/Box";
import { Elements } from "@stripe/react-stripe-js";
import { useCustomMutation } from "@refinedev/core";
import { useCart } from "@/components/Providers/CartProvider";
import Container from "@mui/material/Container";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SLAData } from "@/interfaces";

const Checkout = () => {
  const stripe = useRef(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!));
  const cart = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [data, setData] = useState<any>();
  const { mutate, isLoading } = useCustomMutation({
    mutationOptions: {
      // @ts-expect-error This is a valid object
      onSuccess: (data: any) => {
        setClientSecret(data?.data?.clientSecret || "");
        setData(data?.data);
      },
    },
  });

  if (!clientSecret) {
    if (!isLoading) {
      mutate({
        url: "/checkout/create-payment-intent",
        method: "post",
        values: {
          items: cart.items,
        },
      });
    }
    return <Box>Loading...</Box>;
  }

  const appearance: StripeElementsOptions["appearance"] = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log("data", data);

  const dataToUse = data.orderResult.orderSummary.tickets.map(
    (ticket: {
      service: { title: string; price: { $numberDecimal: string } };
      ticketTotal: { $numberDecimal: string };
      location: string;
      note: string;
      modifiers_info: SLAData[];
    }) => ({
      title: ticket.service.title,
      basePrice: ticket.service.price.$numberDecimal,
      total: ticket.ticketTotal.$numberDecimal,
      location: ticket.location,
      note: ticket.note,
      modifiers: ticket.modifiers_info.map((modifier) => ({
        type: modifier.type,
        dueWithinDays: modifier.dueWithinDays,
        priceModifier: modifier.priceModifier,
      })),
    }),
  );

  return (
    <Box>
      {clientSecret && (
        <Container
          maxWidth="lg"
          sx={{
            padding: "2rem",
          }}
        >
          <Elements options={options} stripe={stripe.current}>
            <CheckoutForm items={dataToUse} grandTotal={data.orderResult.orderSummary.grandTotal.$numberDecimal} />
          </Elements>
        </Container>
      )}
    </Box>
  );
};

export default Checkout;
