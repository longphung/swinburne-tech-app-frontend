import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useList } from "@refinedev/core";
import { ChangeEvent, useMemo, useState } from "react";
import ServiceShoppingCard from "@/components/ServiceShoppingCard";
import { debounce, Pagination } from "@mui/material";

import { ServiceData } from "@/interfaces";

const Services = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data } = useList({
    resource: "services",
    pagination: {
      current: page,
      pageSize: 1,
    },
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

  // console.log(usableData);

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
        <Grid container item xs={12} display="flex" justifyContent="flex-end">
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
