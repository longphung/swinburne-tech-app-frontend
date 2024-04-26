import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useList } from "@refinedev/core";
import { ServiceData } from "@/interfaces";
import { useState } from "react";
import ServiceShoppingCard from "@/components/ServiceShoppingCard";

const Services = () => {
  const { data } = useList({
    resource: "services",
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

  const [search, setSearch] = useState("");

  console.log(usableData);

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "2rem",
      }}
    >
      <Grid container>
        <Grid container item xs={12} display="flex" justifyContent="flex-end">
          <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>

        <Grid container item xs={12} spacing={2}>
          {usableData?.data?.docs.map((service: ServiceData) => (
            <ServiceShoppingCard key={service.id} service={service} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Services;
