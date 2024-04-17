"use client";

import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Refine } from "@refinedev/core";

import authProvider from "@/utils/authProvider";
import accessControlProvider from "@/utils/accessControlProvider";

const RefineProvider = (props) => (
  <RefineSnackbarProvider>
    <Refine
      routerProvider={routerProvider}
      authProvider={authProvider}
      accessControlProvider={accessControlProvider}
      notificationProvider={useNotificationProvider}
    >
      {props.children}
    </Refine>
  </RefineSnackbarProvider>
);

export default RefineProvider;
