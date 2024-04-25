import { Create } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const ServicesCreate = () => {
  const {
    saveButtonProps,
    refineCore: { onFinish },
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      label: "",
      price: 0,
      category: "",
      serviceType: "",
      description: "",
    },
  });
  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" href="/dashboard/services">
        Services
      </Link>
      <Typography color="text.primary">Create</Typography>
    </Breadcrumbs>
  );

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    // onFinish(data);
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      resource="services"
      breadcrumb={breadcrumb}
      title={<Typography variant="h5">Create new service</Typography>}
    >
      <Grid container component="form">
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("title", {
              required: "Title is required",
            })}
            id="title"
            label="Title"
            helperText={errors.title ? errors.title.message : ""}
            error={!!errors.title}
            type="text"
            fullWidth
            placeholder="Title"
            sx={{
              margin: "1rem",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("label", {
              required: "Label is required",
            })}
            id="label"
            label="Label"
            helperText={errors.label ? errors.label.message : ""}
            error={!!errors.label}
            type="text"
            fullWidth
            placeholder="Label"
            sx={{
              margin: "1rem",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("price", {
              required: "Price is required",
            })}
            id="price"
            label="Price"
            helperText={errors.price ? errors.price.message : ""}
            error={!!errors.price}
            type="number"
            fullWidth
            placeholder="Price"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{
              margin: "1rem",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <FormControl
            error={!!errors.category}
            fullWidth
            sx={{
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputLabel id="category">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select id="category" label="Category" {...field}>
                  <MenuItem value="" disabled>None</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.category ? errors.category.message : ""}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <FormControl
            error={!!errors.category}
            fullWidth
            sx={{
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputLabel id="service-type">Service Type</InputLabel>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select id="service-type-select" label="Service Type" {...field}>
                  <MenuItem value="" disabled>None</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="onsite">On Site</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.category ? errors.category.message : ""}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center">
          <TextField
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            label="Description"
            helperText={errors.description ? errors.description.message : ""}
            error={!!errors.description}
            type="text"
            fullWidth
            placeholder="Description"
            sx={{
              margin: "1rem",
            }}
          />
        </Grid>
      </Grid>
    </Create>
  );
};

export default ServicesCreate;
