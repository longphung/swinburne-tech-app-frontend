import { ComponentProps, CSSProperties } from "react";
import { ThemedSiderV2, useThemedLayoutContext } from "@refinedev/mui";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useLink } from "@refinedev/core";
import { useLocation } from "react-router-dom";

const Sider: ComponentProps<typeof ThemedSiderV2>["render"] = ({
  // eslint-disable-next-line react/prop-types
  logout,
  // eslint-disable-next-line react/prop-types
  items,
}) => {
  const location = useLocation();
  const { siderCollapsed, setMobileSiderOpen } = useThemedLayoutContext();
  const Link = useLink();
  const isSelected = location.pathname === "/dashboard/profile";
  const linkStyle: CSSProperties = isSelected ? { pointerEvents: "none" } : {};
  return (
    <>
      <Tooltip
        title="Profile"
        placement="right"
        disableHoverListener={!siderCollapsed}
        arrow
      >
        <ListItemButton
          component={Link}
          to="/dashboard/profile"
          selected={isSelected}
          style={linkStyle}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            justifyContent: "center",
            color: isSelected ? "primary.main" : "text.primary",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              transition: "margin-right 0.3s",
              marginRight: siderCollapsed ? "0px" : "12px",
              minWidth: "24px",
              color: "currentColor",
            }}
          >
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "14px",
            }}
          />
        </ListItemButton>
      </Tooltip>
      {items}
      {logout}
    </>
  );
};

export default Sider;
