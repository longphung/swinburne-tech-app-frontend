import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useList } from "@refinedev/core";

import { ServiceData } from "@/interfaces";
import ServiceShoppingCard from "@/components/ServiceShoppingCard";

const HomePage = () => {
  const { data } = useList({
    resource: "services",
    pagination: {
      current: 1,
      pageSize: 3,
    },
  });
  const usableData =
    (data as unknown as {
      data: {
        docs: ServiceData[];
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
        nextPage: number;
        offset: number;
        page: number;
        pageCounter: number;
        prevPage: number;
        totalDocs: number;
        totalPages: number;
      };
    }) || {};
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
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
      <Container>
        <Typography variant="h3" align="center" mt={6} mb={4}>
          Our Top Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {usableData?.data?.docs.map((service: ServiceData) => (
            <ServiceShoppingCard service={service} key={service.id} />
          ))}
        </Grid>
      </Container>
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
