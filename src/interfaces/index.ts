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
  serviceId: string;
  title: string;
  label: string;
  price: number;
  category: number;
  serviceType: "onsite" | "remote" | "both";
  description: string;
  imageUrl?: string;
};

export type CartItem = Omit<ServiceData, "price"> & {
  note?: string;
  // True if the user has not filled out the required information (for users adding from the service listing page)
  missingInfo?: boolean;
  basePrice: number;
  modifiers?: Array<SLAData>;
  finalPrice?: number;
} & {
  serviceType: "onsite" | "both";
  location?: string;
};

export type Cart = {
  items: Array<CartItem>;
  quantityById: Record<ServiceData["id"], number>;
  total: number;
};

export type SLAData = {
  id: string;
  type: "response" | "completion";
  dueWithinDays: number;
  priceModifier: number;
  fixedPrice: number;
  description: string;
};

export type CompletionSLAData = SLAData & {
  type: "completion";
};

export type ResponseSLAData = SLAData & {
  type: "response";
};
