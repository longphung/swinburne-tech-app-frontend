

import React from "react";
import { Box, Container, Card, Typography, Button, Grid, CardContent, CardMedia, Link, IconButton } from "@mui/material";
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import YouTube from '@mui/icons-material/YouTube';



const HomePage = () => {
  return (
    <Box>
      {/* Section 1: Welcome Section with Background Image */}
      <Box
        sx={{
          backgroundImage: "url('/background.jpg')", // URL to your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px", // Adjust height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography variant="h2" align="center" color="white" mb={4}>
            Elevate your IT Experience Today
          </Typography>
          <Typography variant="body1" align="center" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Container>
      </Box>

      {/* Section 2: Our Top Services */}
      <Container>
        <Typography variant="h3" align="center" mt={6} mb={4}>
          Our Top Services
        </Typography>
        {/* Grid to display services */}
        <Grid container spacing={4} justifyContent="center">
          {/* Replace with your service components */}
          <Grid item>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={'/mic.png'} // URL of your image
                
              />
              <CardContent style={{ textAlign: 'justify' }}>
                <Typography variant="subtitle1" component="div">
                  Set Up My
                  Email Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography variant="body2">
                    We'll assist you with
                  </Typography>
                  <Typography variant="body2">
                    setting up and configuring
                  </Typography>
                  <Typography variant="body2">
                    your email accounts on various
                  </Typography>
                  <Typography variant="body2">
                    email clients or devices.
                  </Typography>

                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h5">Service 2</Typography>
              <Typography variant="body1">
                Description of Service 2
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h5">Service 3</Typography>
              <Typography variant="body1">
                Description of Service 3
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Section 3: Any other info */}
      <Container>
        <Typography variant="h3" align="center" mt={6} mb={4}>
         Any other info
        </Typography>
        <Typography variant="body1" align="center" mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>
      {/* Navigation */}
      <Box bgcolor="primary.main" color="black" py={4}>
        <Container>
          <Grid container spacing={4}>
            
            <Grid item xs={12} sm={3}>

              <Typography variant="h6">Navigation</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link href="#" color="inherit" underline="none">Homepage</Link></li>
                <li><Link href="#" color="inherit" underline="none">Services</Link></li>
                <li><Link href="#" color="inherit" underline="none">About</Link></li>
                <li><Link href="#" color="inherit" underline="none" >Login</Link></li>
              </ul>
            </Grid>
            {/* Contact */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Contact</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>Phone: 123-456-7890</li>
                <li>Email: example@example.com</li>
                <li>Address: 123 Main St, City</li>
              </ul>
            </Grid>

            {/* Social Media Icons */}

            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>Social Media</Typography>
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
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link href="#" underline="none" color="inherit">Login</Link></li>

              </ul>
            </Grid>

          </Grid>

        </Container>
      </Box>



    </Box>
  );
};

export default HomePage;
