import Image from "next/image";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import underConstruction from "@/public/under-construction.png";

import Header from "@/components/Header";
import theme from "@/components/theme";
import SnackbarProvider from "@/components/contexts/SnackbarProvider";
import RefineCustomerProvider from "@/components/contexts/RefineCustomerProvider";

export const metadata = {
  title: "TechAway",
  description:
    "Professional IT Solutions by Tech Away. Small Business, Managed IT or Non-Profit Organisation. Our Expert Team is ready to Provide IT Solution any-day 24x7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RefineCustomerProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
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
              </SnackbarProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </RefineCustomerProvider>
      </body>
    </html>
  );
}
