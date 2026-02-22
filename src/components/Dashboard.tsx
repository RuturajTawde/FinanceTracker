import { calculateAnalytics } from "../utils/analytics";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function Dashboard({ transactions }: any) {

  const data = calculateAnalytics(transactions);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={3}>
        <Card><CardContent>
          <Typography>Income</Typography>
          <Typography>₹ {data.income}</Typography>
        </CardContent></Card>
      </Grid>

      <Grid item xs={3}>
        <Card><CardContent>
          <Typography>Expense</Typography>
          <Typography>₹ {data.expense}</Typography>
        </CardContent></Card>
      </Grid>

      <Grid item xs={3}>
        <Card><CardContent>
          <Typography>Investment</Typography>
          <Typography>₹ {data.investment}</Typography>
        </CardContent></Card>
      </Grid>

      <Grid item xs={3}>
        <Card><CardContent>
          <Typography>Savings</Typography>
          <Typography>₹ {data.savings}</Typography>
        </CardContent></Card>
      </Grid>
    </Grid>
  );
}