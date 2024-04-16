"use client";

import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const FormInputText = ({ name, control, label, type, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          type={type}
          {...rest}
        />
      )}
    />
  );
};

export default FormInputText;
