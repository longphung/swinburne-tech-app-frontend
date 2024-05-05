import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const resources = [
  {
    name: "users",
    list: "/dashboard/users",
    show: "/dashboard/users/:id",
    create: "/dashboard/users/new",
    edit: "/dashboard/users/:id/edit",
    meta: {
      icon: <PeopleIcon />,
      label: "Manage Users",
    },
  },
  {
    name: "services",
    list: "/dashboard/services",
    show: "/dashboard/services/:id",
    create: "/dashboard/services/new",
    edit: "/dashboard/services/:id/edit",
    meta: {
      icon: <StoreIcon />,
      label: "Manage Services",
    },
  },
  {
    name: "Service Level Agreements",
    meta: {
      icon: <HandshakeIcon />,
      label: "SLAs (Service Level Agreements)",
    },
  },
  {
    name: "completion-slas",
    list: "/dashboard/completion-slas",
    show: "/dashboard/completion-slas/:id",
    create: "/dashboard/completion-slas/new",
    edit: "/dashboard/completion-slas/:id/edit",
    meta: {
      parent: "Service Level Agreements",
      icon: <MonetizationOnIcon />,
      label: "Completion",
    },
  },
  {
    name: "response-slas",
    list: "/dashboard/response-slas",
    show: "/dashboard/response-slas/:id",
    create: "/dashboard/response-slas/new",
    edit: "/dashboard/response-slas/:id/edit",
    meta: {
      parent: "Service Level Agreements",
      icon: <MonetizationOnIcon />,
      label: "Response",
    },
  },
  {
    name: "orders",
    list: "/dashboard/orders",
    show: "/dashboard/orders/:id",
    create: "/dashboard/orders/new",
    edit: "/dashboard/orders/:id/edit",
    meta: {
      icon: <MonetizationOnIcon />,
      label: "Manage Orders",
    },
  },
];

export default resources;
