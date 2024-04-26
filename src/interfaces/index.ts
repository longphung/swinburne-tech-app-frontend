export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export const enum USERS_ROLE {
  ADMIN = "admin",
  TECHNICIAN = "technician",
  CUSTOMER = "customer",
}

export type UserData = {
  id: string;
  address: string;
  emailVerified: boolean;
  email: string;
  role: USERS_ROLE[];
  name: string;
  phone: string;
  username: string;
};

export type ServiceData = {
  id: string;
  title: string;
  label: string;
  price: number;
  category: number;
  serviceType: string;
  description: string;
};

export type Cart = {
  items: Array<
    ServiceData & {
      quantity: number;
    }
  >;
};
