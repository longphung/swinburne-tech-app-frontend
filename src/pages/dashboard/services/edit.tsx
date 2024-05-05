import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import Typography from "@mui/material/Typography";
import { Editor as EditorType } from "@tiptap/react";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { useRef } from "react";

import Editor from "@/components/Editor/Editor";
import { useInvalidate } from "@refinedev/core";
import { ServiceData } from "@/interfaces";
import InfoIcon from "@mui/icons-material/Info";

const ServicesEdit = () => {
  const editor = useRef<EditorType>(null);
  const invalidate = useInvalidate();
  const {
    refineCore: { onFinish, queryResult },
    saveButtonProps,
    register,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      label: "",
      price: 0,
      category: "",
      serviceType: "",
      description: "",
      imageUrl: "",
      id: "",
    },
    refineCoreProps: {
      autoSave: {
        enabled: false,
      },
      onMutationSuccess: (_data, variables) => {
        if (variables.id) {
          invalidate({
            resource: "services",
            id: variables.id,
            invalidates: ["detail"],
          });
          return;
        }
        invalidate({
          resource: "services",
          invalidates: ["resourceAll"],
        });
      },
    },
  });
  const { data } = queryResult as unknown as { data: { data?: ServiceData } };

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" href="/dashboard/services">
        Services
      </Link>
      <Typography color="text.primary">Edit</Typography>
    </Breadcrumbs>
  );

  const onSubmit = handleSubmit((data) => {
    onFinish({
      ...data,
      id: (queryResult?.data as unknown as { id: string }).id,
    });
  });

  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => {
          setValue("description", editor.current?.getHTML() || "");
          onSubmit();
        },
      }}
      breadcrumb={breadcrumb}
      title={
        <Typography variant="h4" gutterBottom>
          Edit Service
        </Typography>
      }
    >
      <Grid container component="form" spacing={2} onSubmit={onSubmit}>
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("title", { required: true })}
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
            {...register("label", { required: true })}
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
            {...register("price", { required: true })}
            id="price"
            label="Price"
            helperText={errors.price ? errors.price.message : ""}
            error={!!errors.price}
            type="number"
            fullWidth
            placeholder="Price"
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
            <InputLabel id="category-input-label">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select id="category" label="Category" {...field}>
                  <MenuItem value="" disabled>
                    None
                  </MenuItem>
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
            error={!!errors.serviceType}
            fullWidth
            sx={{
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputLabel id="serviceType">Service Type</InputLabel>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select id="serviceType" label="Service Type" {...field}>
                  <MenuItem value="" disabled>
                    None
                  </MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="onsite">On Site</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.serviceType ? errors.serviceType.message : ""}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <TextField
            {...register("imageUrl", { required: true })}
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

        {data?.data?.description && (
          <Grid item xs={12} padding="1rem">
            <InputLabel sx={{ marginBottom: "1rem" }}>Description</InputLabel>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <Editor
                // @ts-expect-error This is a valid call
                initialContent={data.data.description}
                ref={editor}
              />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Edit>
  );
};

export default ServicesEdit;
