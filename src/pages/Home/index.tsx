import React from "react";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
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
                image={"/mic.png"} // URL of your image
              />
              <CardContent style={{ textAlign: "justify" }}>
                <Typography variant="subtitle1" component="div">
                  Set Up My Email Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography variant="body2">We&apos;ll assist you with</Typography>
                  <Typography variant="body2">setting up and configuring</Typography>
                  <Typography variant="body2">your email accounts on various</Typography>
                  <Typography variant="body2">email clients or devices.</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h5">Service 2</Typography>
              <Typography variant="body1">Description of Service 2</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h5">Service 3</Typography>
              <Typography variant="body1">Description of Service 3</Typography>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePage;
