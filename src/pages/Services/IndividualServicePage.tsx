import { useOne } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { CircularProgress } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Editor from "@/components/Editor/Editor";
import { CartItem, CompletionSLAData, ResponseSLAData, ServiceData } from "@/interfaces";
import { addItem, useCartDispatch } from "@/components/Providers/CartProvider";
import SLASelect from "@/components/SLASelect";

const IndividualServicePage = () => {
  const dispatchCart = useCartDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: serviceDataResponse } = useOne({
    resource: "services",
    id,
  });
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      note: "",
      location: "",
      completionSLA: null as unknown as CompletionSLAData,
      responseSLA: null as unknown as ResponseSLAData,
    },
  });

  const serviceData = serviceDataResponse?.data as ServiceData;

  const onSubmit = (data: {
    completionSLA: CompletionSLAData;
    responseSLA: ResponseSLAData;
    note: string;
    location: string;
  }) => {
    const { price, ...serviceDataWithoutPrice } = serviceData;
    const modifiers = [];
    if (data.completionSLA) {
      modifiers.push(data.completionSLA);
    }
    if (data.responseSLA) {
      modifiers.push(data.responseSLA);
    }
    dispatchCart(addItem({ ...serviceDataWithoutPrice, modifiers, basePrice: price } as CartItem));
    reset();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!serviceData) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "2rem",
      }}
    >
      <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container item xs={12} md={6} display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={serviceData.imageUrl}
            alt={serviceData.title}
            sx={{
              height: "100%",
              maxHeight: "32rem",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{serviceData.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {serviceData.label}
          </Typography>
          <Typography variant="h6">${serviceData.price}</Typography>
          <Typography variant="h6">Service Type: {serviceData.serviceType}</Typography>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Service Level Agreements (SLA):</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <SLASelect control={control as never} resource="response-slas" name="responseSLA" label="Response SLA" />
            </Grid>

            <Grid item xs={12} md={6}>
              <SLASelect
                control={control as never}
                resource="completion-slas"
                name="completionSLA"
                label="Completion SLA"
              />
            </Grid>

            {serviceData.serviceType === "both" ||
              (serviceData.serviceType === "onsite" && (
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("location", {
                      required: "Fill in location. Location is required for on-site services.",
                    })}
                    label="Location"
                    fullWidth
                    variant="outlined"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                </Grid>
              ))}
          </Grid>
          <Box sx={{ width: "100%" }}>
            <Editor
              // @ts-expect-error This is a valid prop
              initialContent={serviceData.description}
              editable={false}
            />
          </Box>
          <TextField
            {...register("note")}
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.note}
            helperText={errors.note?.message}
          />
          <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }} type="submit">
            <AddShoppingCartIcon sx={{ marginRight: "0.5rem" }} />
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndividualServicePage;
