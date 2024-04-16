import Image from "next/image";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import underConstruction from "@/public/under-construction.png";

import Header from "@/components/Header";
import theme from "@/components/theme";

export const metadata = {
  title: "TechAway",
  description:
    "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Refine routerProvider={routerProvider}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              {process.env.IS_UNDER_CONSTRUCTION === "1" ? (
                <Image
                  src={underConstruction}
                  width={512}
                  alt="Under Construction"
                  className="my-8 mx-auto"
                />
              ) : (
                children
              )}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Refine>
      </body>
    </html>
  );
}
