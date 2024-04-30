import { useOne } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { CircularProgress, Theme, useMediaQuery } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { DatePicker } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Editor from "@/components/Editor/Editor";
import { CartItem, ServiceData } from "@/interfaces";
import { addItem, useCartDispatch } from "@/components/Providers/CartProvider";

const IndividualServicePage = () => {
  const dispatchCart = useCartDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { id } = useParams<{ id: string }>();
  const { data } = useOne({
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
      priorityDueDate: null as Date | null,
      note: "",
      location: "",
    },
  });

  const serviceData = data?.data as ServiceData;

  const onSubmit = (data: { priorityDueDate: Date | null; note: string; location: string }) => {
    reset();
    dispatchCart(addItem({ ...serviceData, ...data } as CartItem));
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
          <Typography variant="h4" component="div">
            {serviceData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {serviceData.label}
          </Typography>
          <Typography variant="h6" component="div">
            Price: ${serviceData.price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Service Type: {serviceData.serviceType}
          </Typography>
          <Grid container item xs={12} sx={{ margin: "1rem 0" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingRight: isMobile ? 0 : "1rem",
                paddingBottom: isMobile ? "1rem" : 0,
              }}
            >
              <Controller
                name="priorityDueDate"
                control={control}
                rules={{
                  required: "Fill in preferred due date. Preferred due date is required.",
                }}
                render={({ field }) => (
                  <DatePicker
                    name={field.name}
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                    disablePast
                    inputRef={field.ref}
                    slotProps={{
                      textField: {
                        error: !!errors.priorityDueDate,
                        helperText: errors.priorityDueDate?.message,
                        placeholder: "DD/MM/YYYY",
                      },
                    }}
                    format={"dd/MM/yyyy"}
                    label="Preferred Due Date"
                    sx={{ width: "100%" }}
                  />
                )}
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
