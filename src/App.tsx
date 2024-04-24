import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ConfirmProvider } from "material-ui-confirm";
import { Refine } from "@refinedev/core";
import {
  RefineSnackbarProvider,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import authProvider from "./utils/authProvider";
import { beInst } from "@/api/backend";
import { dataProvider } from "@/utils/restDataProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <ConfirmProvider>
          <RefineSnackbarProvider>
            <Refine
              authProvider={authProvider}
              dataProvider={dataProvider("", beInst)}
              // dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              resources={[
                {
                  name: "users",
                  list: "/dashboard/users",
                  show: "/dashboard/users/:id",
                  create: "/dashboard/users/new",
                  edit: "/dashboard/users/:id/edit",
                },

              ]}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              // resources={}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Router />
            </Refine>
          </RefineSnackbarProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
