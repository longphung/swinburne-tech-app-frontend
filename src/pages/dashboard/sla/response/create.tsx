import { FC, ReactNode } from "react";
import { Create } from "@refinedev/mui";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { ResponseSLAData } from "@/interfaces";

const CompletionSLACreate: FC = () => {
  const {
    saveButtonProps,
    register,
    refineCore: { onFinish },
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ResponseSLAData>({
    defaultValues: {
      dueWithinDays: 0,
      priceModifier: 0,
      fixedPrice: 0,
      description: "",
    },
    refineCoreProps: {
      action: "create",
      resource: "response-slas",
      meta: {
        customUrl: (url: string) => `${url}/service-level-agreements`,
      },
    },
  });

  const breadcrumb = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard/response-slas">
        Response SLAs
      </Link>
      <Typography>Create</Typography>
    </Breadcrumbs>
  );

  const onSubmit = handleSubmit((data) => {
    onFinish({
      ...data,
      type: "response",
    });
  });

  const watchedDueWithinDays = watch("dueWithinDays");

  return (
    <Create
      breadcrumb={breadcrumb}
      saveButtonProps={{ ...saveButtonProps, onClick: onSubmit }}
      title={
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          Response Completion SLA
        </Typography>
      }
    >
      <Grid container component="form" spacing={2} onSubmit={onSubmit}>
        <Grid item xs={12}>
          <Typography variant="h6">Displayed label: &quot;Within {watchedDueWithinDays} days&quot;</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Due Within Days"
            type="number"
            {...register("dueWithinDays", { required: "Due Within Days is required" })}
            error={!!errors.dueWithinDays}
            helperText={(errors.dueWithinDays?.message as ReactNode) || ""}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Price Modifier"
            type="number"
            {...register("priceModifier", { required: "Price Modifier is required" })}
            error={!!errors.priceModifier}
            helperText={(errors.priceModifier?.message as ReactNode) || ""}
            fullWidth
          />
        </Grid>
        {/*<Grid item xs={12} md={6} lg={4}>*/}
        {/*  <TextField*/}
        {/*    label="Fixed Price"*/}
        {/*    type="number"*/}
        {/*    {...register("fixedPrice", { required: "Fixed Price is required" })}*/}
        {/*    error={!!errors.fixedPrice}*/}
        {/*    helperText={(errors.fixedPrice?.message as ReactNode) || ""}*/}
        {/*    fullWidth*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={(errors.description?.message as ReactNode) || ""}
            fullWidth
          />
        </Grid>
      </Grid>
    </Create>
  );
};

export default CompletionSLACreate;
