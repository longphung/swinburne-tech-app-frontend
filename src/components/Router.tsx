import { Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Authenticated } from "@refinedev/core";
import { AuthPage, ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";

import Header from "./Header";
import Typography from "@mui/material/Typography";
import RememberMe from "@/components/RememberMe";
import { CircularProgress } from "@mui/material";

const Register = lazy(() => import("@/components/Register"));
const UpdatePassword = lazy(() => import("@/components/UpdatePassword"));
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));

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
        <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Home />
            </Suspense>
          }
        />
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
            />
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Register />
            </Suspense>
          }
        />
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
        <Route
          path="/update-password"
          element={
            <Suspense fallback={<CircularProgress />}>
              <UpdatePassword />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<CircularProgress />}>
              <About />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorComponent />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <Authenticated key="catch-all" v3LegacyAuthProviderCompatible={false}>
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Home />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
