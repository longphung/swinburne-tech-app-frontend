import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { FC, MouseEventHandler } from "react";
import Card from "@mui/material/Card";
import { CardActions, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { CartItem, ServiceData } from "@/interfaces";
import { addItem, useCartDispatch } from "@/components/Providers/CartProvider";

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    transform: translateY(-2.5px);
  }
`;

interface Props {
  service: ServiceData;
}

const ServiceShoppingCard: FC<Props> = (props) => {
  const { service } = props;
  const { price, ...serviceWithoutPrice } = service;
  const dispatchCart = useCartDispatch();
  // Add missingInfo property to the service
  const serviceToUse: CartItem = {
    ...serviceWithoutPrice,
    missingInfo: true,
    basePrice: price,
  } as CartItem;

  /**
   * AUD with 2 decimals
   */
  const priceToShow = Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const handleAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatchCart(addItem(serviceToUse));
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StyledCard
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        // @ts-expect-error This is correct, Card component inherits Paper props
        component={Link}
        to={`/services/${serviceToUse.id}`}
      >
        <CardMedia
          component="img"
          image={serviceToUse.imageUrl ? serviceToUse.imageUrl : "https://placehold.co/600x400"}
          alt={serviceToUse.title}
          sx={{
            height: "250px",
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h5" component="div">
            {serviceToUse.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {serviceToUse.label}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="text.primary">
            {priceToShow}
          </Typography>

          <Button onClick={handleAdd}>
            <AddShoppingCartIcon sx={{ marginRight: "0.5rem" }} />
            Add
          </Button>
        </CardActions>
      </StyledCard>
    </Grid>
  );
};

export default ServiceShoppingCard;
