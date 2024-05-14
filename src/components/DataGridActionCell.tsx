import React, { useState } from "react";
import { IconButton, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteButton, EditButton } from "@refinedev/mui";

const DataGridActionCell = (props: { id: string; resource: string; canDelete?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handlePopoverOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="open" onClick={handlePopoverOpen}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl as Element}
        sx={{
          maxWidth: "20rem",
        }}
      >
        {props.canDelete && (
          <DeleteButton resource={props.resource} recordItemId={props.id} fullWidth sx={{ padding: "1rem" }} />
        )}
        <EditButton resource={props.resource} recordItemId={props.id} fullWidth sx={{ padding: "1rem" }} />
      </Popover>
    </>
  );
};

export default DataGridActionCell;
