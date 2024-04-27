import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useList } from "@refinedev/core";
import { ChangeEvent, useMemo, useState } from "react";
import { debounce, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";

import ServiceShoppingCard from "@/components/ServiceShoppingCard";
import { ServiceData } from "@/interfaces";

const Services = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [serviceType, setServiceType] = useState<string>("");

  const { data } = useList({
    resource: "services",
    pagination: {
      current: page,
      pageSize: 1,
    },
    filters: [
      {
        field: "category",
        operator: "eq",
        value: category || undefined,
      },
      {
        field: "serviceType",
        operator: "eq",
        value: serviceType || undefined,
      },
    ],
    meta: { query: { q: search } },
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
  const debouncedSetSearch = useMemo(
    () =>
      debounce((searchTerm) => {
        setSearch(searchTerm);
        setPage(1);
      }, 250),
    [],
  );

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(event.target.value);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "2rem",
      }}
    >
      <Grid container spacing={4}>
        <Grid container item xs={12} display="flex" justifyContent="space-between">
          <Box flexGrow={1}>
            <FormControl fullWidth sx={{ maxWidth: "10rem", marginRight: "2rem" }}>
              <InputLabel id="category-select">Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value as number)} label="Category">
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ maxWidth: "10rem" }}>
              <InputLabel id="service-type-select">Service Type</InputLabel>
              <Select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as string)}
                label="Service Type"
              >
                <MenuItem value="">All Service Types</MenuItem>
                <MenuItem value="onsite">On Site</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField label="Search" onChange={handleSearchChange} />
        </Grid>

        <Grid container item xs={12} spacing={2}>
          {usableData?.data?.docs.map((service: ServiceData) => (
            <ServiceShoppingCard key={service.id} service={service} />
          ))}
        </Grid>

        {usableData?.data?.totalPages > 1 && (
          <Grid container item xs={12}>
            <Pagination
              color="primary"
              onChange={handlePageChange}
              count={usableData?.data?.totalPages}
              page={page}
              sx={{
                margin: "auto",
              }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Services;
