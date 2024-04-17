"use client";

import routerProvider from "@refinedev/nextjs-router";
import { Refine } from "@refinedev/core";

import authProvider from "@/utils/authProvider";
import accessControlProvider from "@/utils/accessControlProvider";

const RefineProvider = (props) => (
  <Refine
    routerProvider={routerProvider}
    authProvider={authProvider}
    accessControlProvider={accessControlProvider}
  >
    {props.children}
  </Refine>
);

export default RefineProvider;
