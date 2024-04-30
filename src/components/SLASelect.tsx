import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { useList } from "@refinedev/core";

import { SLAData } from "@/interfaces";

interface Props {
  control: never;
  resource: "response-slas" | "completion-slas";
  name: string;
  label: string;
}

const SLASelect: FC<Props> = (props) => {
  const { data } = useList<SLAData>({
    resource: props.resource,
    filters: [
      {
        field: "type",
        operator: "eq",
        value: props.resource === "response-slas" ? "response" : "completion",
      },
    ],
    sorters: [
      {
        field: "dueWithinDays",
        order: "asc",
      },
    ],
    meta: {
      customUrl: (url: string) => `${url}/service-level-agreements`,
    },
  });

  const selectData = data?.data;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.name}-input-label`}>{props.label}</InputLabel>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <Select
            labelId={`${props.name}-label`}
            id={`${props.name}-select`}
            value={field.value?.id || ""}
            label={props.label}
            onChange={(e) => {
              if (e.target.value === "") {
                field.onChange(null);
                return;
              }
              field.onChange(selectData?.find((sla) => sla.id === e.target.value) || {});
            }}
            ref={field.ref}
          >
            <MenuItem key="none" value="">
              None
            </MenuItem>
            {selectData?.map((sla) => (
              <MenuItem key={sla.id} value={sla.id}>
                Within {sla.dueWithinDays} days - Price x {sla.priceModifier}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SLASelect;
