import { useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const RememberMe = () => {
  const { register } = useFormContext();

  return (
    <FormControlLabel
      sx={{
        span: {
          fontSize: "12px",
          color: "text.secondary",
        },
      }}
      color="secondary"
      control={
        <Checkbox size="small" id="rememberMe" {...register("rememberMe")} />
      }
      label="Remember me"
    />
  );
};

export default RememberMe
