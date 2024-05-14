import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
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
import resources from "@/utils/resources";

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
                    resources={resources}
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
