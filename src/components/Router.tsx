import { Link as RouteLink, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Authenticated } from "@refinedev/core";
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/mui";

import Header from "./Header";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

import logoIcon from "@/assets/logo-icon.png";
import logo from "@/assets/logo.png";
import Sider from "@/components/Sider";
import Footer from "@/components/Footer";

const Register = lazy(() => import("@/components/Register"));
const UpdatePassword = lazy(() => import("@/components/UpdatePassword"));
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/components/Login"));
const ForgotPassword = lazy(() => import("@/components/ForgotPassword"));
const Profile = lazy(() => import("@/pages/dashboard/Profile"));
const UsersList = lazy(() => import("@/pages/dashboard/users/list"));
// const UsersCreate = lazy(() => import("@/pages/dashboard/users/create"));
const UsersEdit = lazy(() => import("@/pages/dashboard/users/edit"));
const UsersShow = lazy(() => import("@/pages/dashboard/users/show"));
const ServicesShow = lazy(() => import("@/pages/dashboard/services/show"));
const ServicesList = lazy(() => import("@/pages/dashboard/services/list"));
const ServicesCreate = lazy(() => import("@/pages/dashboard/services/create"));
const ServicesEdit = lazy(() => import("@/pages/dashboard/services/edit"));
const IndividualServicePage = lazy(() => import("@/pages/Services/IndividualServicePage"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const CompletionSLAList = lazy(() => import("@/pages/dashboard/sla/completion/list"));
const CompletionSLACreate = lazy(() => import("@/pages/dashboard/sla/completion/create"));
const CompletionSLAEdit = lazy(() => import("@/pages/dashboard/sla/completion/edit"));
const ResponseSLAList = lazy(() => import("@/pages/dashboard/sla/response/list"));
const ResponseSLACreate = lazy(() => import("@/pages/dashboard/sla/response/create"));
const ResponseSLAEdit = lazy(() => import("@/pages/dashboard/sla/response/edit"));
const OrdersList = lazy(() => import("@/pages/dashboard/orders/list"));
const OrdersEdit = lazy(() => import("@/pages/dashboard/orders/edit"));
const OrdersShow = lazy(() => import("@/pages/dashboard/orders/show"));
const TicketsList = lazy(() => import("@/pages/dashboard/tickets/list"));
const TicketsShow = lazy(() => import("@/pages/dashboard/tickets/show"));
const TicketsEdit = lazy(() => import("@/pages/dashboard/tickets/edit"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const CheckoutSuccess = lazy(() => import("@/pages/CheckoutSuccess"));

// eslint-disable-next-line max-lines-per-function
const Router = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Authenticated key="catch-all" redirectOnFail="/login" v3LegacyAuthProviderCompatible={false}>
            <ThemedLayoutV2
              Title={({ collapsed }) => (
                <RouteLink
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={collapsed ? logoIcon : logo}
                    alt="TechAway Logo"
                    style={{ cursor: "pointer", height: "2rem" }}
                  />
                </RouteLink>
              )}
              Sider={(props) => <ThemedSiderV2 {...props} render={Sider} />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <Suspense fallback={<CircularProgress />}>
              <UsersList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <UsersShow />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users/new"
          element={
            <Suspense fallback={<CircularProgress />}>
              <RouteLink to={`/dashboard/users`}>Back to Users</RouteLink>
              <Typography variant="h4">Please use the sign up form.</Typography>
              Link to <RouteLink to="/register">Register</RouteLink>
            </Suspense>
          }
        />
        <Route
          path="/dashboard/users/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <UsersEdit />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ServicesList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/services/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ServicesShow />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/services/new"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ServicesCreate />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/services/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ServicesEdit />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/completion-slas"
          element={
            <Suspense fallback={<CircularProgress />}>
              <CompletionSLAList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/completion-slas/new"
          element={
            <Suspense fallback={<CircularProgress />}>
              <CompletionSLACreate />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/completion-slas/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <CompletionSLAEdit />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/response-slas"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ResponseSLAList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/response-slas/new"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ResponseSLACreate />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/response-slas/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ResponseSLAEdit />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <Suspense fallback={<CircularProgress />}>
              <OrdersList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/orders/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <OrdersEdit />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/orders/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <OrdersShow />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            <Suspense fallback={<CircularProgress />}>
              <TicketsList />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/tickets/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <TicketsShow />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/tickets/:id/edit"
          element={
            <Suspense fallback={<CircularProgress />}>
              <TicketsEdit />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorComponent />} />
      </Route>

      <Route
        element={
          <main>
            <Header />
            <Outlet />
            <Footer />
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
            <Suspense fallback={<CircularProgress />}>
              <Login
                rememberMe=""
                title={
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Dashboard Login
                  </Typography>
                }
              />
            </Suspense>
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
            <Suspense fallback={<CircularProgress />}>
              <ForgotPassword
                title={
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Password Recovery
                  </Typography>
                }
              />
            </Suspense>
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
          path="/services/:id"
          element={
            <Suspense fallback={<CircularProgress />}>
              <IndividualServicePage />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Checkout />
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
        <Route
          path="/checkout/success"
          element={
            <Suspense fallback={<CircularProgress />}>
              <CheckoutSuccess />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

export default Router;
