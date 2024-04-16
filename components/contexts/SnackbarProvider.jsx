"use client";

import { SnackbarProvider } from "notistack";
// Re-exporting the SnackbarProvider from notistack to use the "use client" flag because the layout file needs to stay on the server
const SnackbarProviderComponent = SnackbarProvider;

export default SnackbarProviderComponent;
