import React, { FC } from "react";
import { Autocomplete, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";

import { UserData, USERS_ROLE } from "@/interfaces";
import TextField from "@mui/material/TextField";
import { useList } from "@refinedev/core";

type Props = {
  name: string;
  control: never;
  label: string;
  resource: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER;
  error: string;
};

const UsersSelect: FC<Props> = (props) => {
  const { name, control, label, resource } = props;
  const { data, isLoading } = useList<UserData>({
    resource: "users",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: resource,
      },
    ],
    sorters: [
      {
        field: "name",
        order: "asc",
      },
    ],
  });
  const [open, setOpen] = React.useState(false);
  // User data
  const options = data?.data || ([] as UserData[]);

  return (
    <Controller
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field }) => (
        <Autocomplete
          id={`${name}-select`}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option.id}
          fullWidth
          options={options}
          onChange={(_, data) => {
            field.onChange(data);
          }}
          value={field.value || null}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!props.error}
              helperText={props.error}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
      name={name}
    />
  );
};

export default UsersSelect;
