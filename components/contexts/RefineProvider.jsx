"use client";

import routerProvider from "@refinedev/nextjs-router";
import { Refine } from "@refinedev/core";
import authProvider from "@/utils/authProvider";

const RefineProvider = (props) => (
  <Refine routerProvider={routerProvider} authProvider={authProvider}>
    {props.children}
  </Refine>
);

export default RefineProvider;
