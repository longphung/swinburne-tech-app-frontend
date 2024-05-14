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

export enum TICKET_STATUS {
  NOT_STARTED = "Not Started",
  OPEN = "Open",
  QUERIES_CLIENT = "Queries Client",
  QUERIES_EXTERNAL = "Queries External",
  COMPLETE = "Complete",
}

// "planned", "low", "medium", "high", "critical"
export enum URGENCY {
  PLANNED = "planned",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export type Ticket = {
  id: string;
  customerId: {
    _id: string;
    name: string;
    id: string;
  };
  serviceId: {
    _id: string;
    title: string;
    id: string;
  };
  urgency: keyof typeof URGENCY;
  location: string;
  assignedTo: {
    _id: string;
    name: string;
    id: string;
  };
  modifiers: Array<SLAData>;
  note: string;
  refundFlag: boolean;
  status: keyof typeof TICKET_STATUS;
  createdAt: string;
  updatedAt: string;
};

export type OrderData = {
  id: string;
  orderNumber: string;
  grandTotal: number;
  customerId: Pick<UserData, "id" | "name">;
  status: "pending" | "cancelled" | "completed";
  tickets: Array<{
    _id: string;
    // The title of the service
    service: string;
  }>;
  createdAt: string;
  updatedAt: string;
};
