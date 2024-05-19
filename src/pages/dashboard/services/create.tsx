import { Create } from "@refinedev/mui";
import InfoIcon from "@mui/icons-material/Info";
import { useRef } from "react";
import { Editor as EditorType } from "@tiptap/react";
import Typography from "@mui/material/Typography";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import Editor from "@/components/Editor/Editor";
import { CATEGORY_LABELS } from "@/interfaces";

const ServicesCreate = () => {
  const editor = useRef<EditorType>(null);
  const {
    saveButtonProps,
    refineCore: { onFinish },
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      label: "",
      price: 0,
      category: "",
      serviceType: "",
      imageUrl: "",
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
    onFinish(data);
  });

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => {
          setValue("description", editor.current?.getHTML() || "");
          onSubmit();
        },
      }}
      resource="services"
      breadcrumb={breadcrumb}
      title={<Typography variant="h5">Create new service</Typography>}
    >
      <Grid container component="form" onSubmit={onSubmit} spacing={2}>
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
                  <MenuItem value="" disabled>
                    None
                  </MenuItem>
                  <MenuItem value={1}>{CATEGORY_LABELS[1]}</MenuItem>
                  <MenuItem value={2}>{CATEGORY_LABELS[2]}</MenuItem>
                  <MenuItem value={3}>{CATEGORY_LABELS[3]}</MenuItem>
                  <MenuItem value={4}>{CATEGORY_LABELS[4]}</MenuItem>
                  <MenuItem value={5}>{CATEGORY_LABELS[5]}</MenuItem>
                  <MenuItem value={6}>{CATEGORY_LABELS[6]}</MenuItem>
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
                  <MenuItem value="" disabled>
                    None
                  </MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="onsite">On Site</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.category ? errors.category.message : ""}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("imageUrl")}
            id="imageUrl"
            label={
              <Typography variant="body1">
                Image URL
                <Tooltip title="We don't support image preview yet" placement="top">
                  <InfoIcon />
                </Tooltip>
              </Typography>
            }
            helperText={errors.imageUrl ? errors.imageUrl.message : ""}
            error={!!errors.imageUrl}
            type="text"
            fullWidth
            placeholder="Image URL"
            sx={{
              margin: "1rem",
            }}
          />
        </Grid>

        <Grid item xs={12} padding="1rem">
          <InputLabel sx={{ marginBottom: "1rem" }}>Description</InputLabel>
          <Paper elevation={2} sx={{ padding: "1rem" }}>
            <Editor
              // @ts-expect-error This is a valid call
              initialContent={"Description of the service"}
              ref={editor}
            />
          </Paper>
        </Grid>
      </Grid>
    </Create>
  );
};

export default ServicesCreate;
