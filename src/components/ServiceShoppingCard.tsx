import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React from "react";
import Card from "@mui/material/Card";
import { CardActions, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ServiceData } from "@/interfaces";

interface Props {
  service: ServiceData;
}

const ServiceShoppingCard: React.FC<Props> = (props) => {
  const { service } = props;
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
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={service.imageUrl ? service.imageUrl : "https://placehold.co/600x400"}
          alt={service.title}
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
            {service.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {service.label}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ServiceShoppingCard;
