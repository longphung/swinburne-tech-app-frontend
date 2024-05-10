import React from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "react-router-dom";

const TicketsEdit = () => {
  const { id } = useParams();
  const {} = useForm({
    defaultValues: {

    }
  });

  return <Edit></Edit>;
};

export default TicketsEdit;
