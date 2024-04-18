import { Outlet, Route, Routes } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { AuthPage, ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";
import { useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { authCredentials } from "../utils/authProvider";
import Header from "./Header";
import { Register } from "@/components/Register";
import Home from "@/pages/Home/Home";
import Typography from "@mui/material/Typography";
import UpdatePassword from "@/components/UpdatePassword";

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

const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <main>
            <Header />
            <Outlet />
          </main>
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              rememberMe={<RememberMe />}
              title={
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Dashboard Login
                </Typography>
              }
              formProps={{
                defaultValues: {
                  ...authCredentials,
                },
              }}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={
            <AuthPage
              title={
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Password Recovery
                </Typography>
              }
              type="forgotPassword"
            />
          }
        />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>

      <Route
        element={
          <Authenticated key="catch-all">
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

export default Router;
