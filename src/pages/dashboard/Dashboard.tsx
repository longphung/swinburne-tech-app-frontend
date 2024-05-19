import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <Container
      maxWidth='xl'
    >
      <Typography variant='h1'>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant='h2'>Welcome to the dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1'>This is the dashboard page.</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
