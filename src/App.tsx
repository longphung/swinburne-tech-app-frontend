import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import CssBaseline from "@mui/material/CssBaseline";
import { ConfirmProvider } from "material-ui-confirm";
import { Refine } from "@refinedev/core";
import { RefineSnackbarProvider, RefineThemes, useNotificationProvider } from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ThemeProvider } from "@mui/material/styles";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import authProvider from "./utils/authProvider";
import { beInst } from "@/api/backend";
import { dataProvider } from "@/utils/restDataProvider";
import CartProvider from "@/components/Providers/CartProvider";
import accessControlProvider from "@/utils/accessControlProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider theme={RefineThemes.Blue}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <ConfirmProvider>
            <CartProvider>
              <RefineSnackbarProvider>
                <DevtoolsProvider>
                  <Refine
                    authProvider={authProvider}
                    dataProvider={dataProvider("", beInst)}
                    resources={[
                      {
                        name: "users",
                        list: "/dashboard/users",
                        show: "/dashboard/users/:id",
                        create: "/dashboard/users/new",
                        edit: "/dashboard/users/:id/edit",
                        meta: {
                          icon: <PeopleIcon />,
                          label: "Manage Users",
                        },
                      },
                      {
                        name: "services",
                        list: "/dashboard/services",
                        show: "/dashboard/services/:id",
                        create: "/dashboard/services/new",
                        edit: "/dashboard/services/:id/edit",
                        meta: {
                          icon: <StoreIcon />,
                          label: "Manage Services",
                        },
                      },
                      {
                        name: "Service Level Agreements",
                        meta: {
                          icon: <HandshakeIcon />,
                          label: "SLAs (Service Level Agreements)",
                        },
                      },
                      {
                        name: "completion-slas",
                        list: "/dashboard/completion-slas",
                        show: "/dashboard/completion-slas/:id",
                        create: "/dashboard/completion-slas/new",
                        edit: "/dashboard/completion-slas/:id/edit",
                        meta: {
                          parent: "Service Level Agreements",
                          icon: <MonetizationOnIcon />,
                          label: "Completion",
                        },
                      },
                      {
                        name: "response-slas",
                        list: "/dashboard/response-slas",
                        show: "/dashboard/response-slas/:id",
                        create: "/dashboard/response-slas/new",
                        edit: "/dashboard/response-slas/:id/edit",
                        meta: {
                          parent: "Service Level Agreements",
                          icon: <MonetizationOnIcon />,
                          label: "Response",
                        },
                      },
                      {
                        name: "orders",
                        list: "/dashboard/orders",
                        show: "/dashboard/orders/:id",
                        create: "/dashboard/orders/new",
                        edit: "/dashboard/orders/:id/edit",
                        meta: {
                          icon: <MonetizationOnIcon />,
                          label: "Manage Orders",
                        },
                      }
                    ]}
                    routerProvider={routerProvider}
                    notificationProvider={useNotificationProvider}
                    accessControlProvider={accessControlProvider}
                    // resources={}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      projectId: "qdfM7M-qCRHlR-IDgJ9N",
                    }}
                  >
                    <Router />
                  </Refine>
                  <DevtoolsPanel />
                </DevtoolsProvider>
              </RefineSnackbarProvider>
            </CartProvider>
          </ConfirmProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
