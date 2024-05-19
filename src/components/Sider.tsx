import { ComponentProps, CSSProperties } from "react";
import { ThemedSiderV2, useThemedLayoutContext } from "@refinedev/mui";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useLink } from "@refinedev/core";
import { useLocation } from "react-router-dom";

const getLinkStyle = (isSelected: boolean): CSSProperties => {
  return isSelected ? { pointerEvents: "none" } : {};
};

const Sider: ComponentProps<typeof ThemedSiderV2>["render"] = ({
  // eslint-disable-next-line react/prop-types
  logout,
  // eslint-disable-next-line react/prop-types
  items,
}) => {
  const location = useLocation();
  const { siderCollapsed, setMobileSiderOpen } = useThemedLayoutContext();
  const Link = useLink();

  return (
    <>
      <Tooltip title="Dashboard" placement="right" disableHoverListener={!siderCollapsed} arrow>
        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={location.pathname === "/dashboard"}
          style={getLinkStyle(location.pathname === "/dashboard")}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            justifyContent: "center",
            color: location.pathname === "/dashboard" ? "primary.main" : "text.primary",
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
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "14px",
            }}
          />
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Profile" placement="right" disableHoverListener={!siderCollapsed} arrow>
        <ListItemButton
          component={Link}
          to="/dashboard/profile"
          selected={location.pathname === "/dashboard/profile"}
          style={getLinkStyle(location.pathname === "/dashboard/profile")}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            justifyContent: "center",
            color: location.pathname === "/dashboard/profile" ? "primary.main" : "text.primary",
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
