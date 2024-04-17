import { Authenticated } from "@refinedev/core";

export const Customer = (props) => {
  return (
    <Authenticated v3LegacyAuthProviderCompatible={false} key="customer-dashboard">
      {props.children}
    </Authenticated>
  );
};
