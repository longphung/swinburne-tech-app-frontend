import React from "react";
import { Box, Container, Grid, IconButton, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box bgcolor="primary.main" color="#f6f6f6" py={4} mt={8} component="footer">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Navigation</Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link color="inherit" component={RouterLink} underline="hover" to="/">
                  Homepage
                </Link>
              </li>
              <li>
                <Link color="inherit" component={RouterLink} underline="hover" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link color="inherit" component={RouterLink} underline="hover" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link color="inherit" component={RouterLink} underline="hover" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </Grid>
          {/* Contact */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Contact</Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>Phone: 123-456-7890</li>
              <li>Email: example@example.com</li>
              <li>Address: 123 Main St, City</li>
            </ul>
          </Grid>

          {/* Social Media Icons */}

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <YouTube />
            </IconButton>
          </Grid>
          {/* Admin Login */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Admin</Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link color="inherit" underline="hover" component={RouterLink} to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
