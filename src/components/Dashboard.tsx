import { Grid, Paper, Box } from "@mui/material";
import { calculateAnalytics } from "../utils/analytics";

export default function Dashboard({ transactions }: any) {
  const data = calculateAnalytics(transactions);

  const kpis = [
    {
      label: "Income",
      value: data.income,
      bg: "rgba(34,197,94,0.08)",
      color: "#16a34a",
    },
    {
      label: "Expense",
      value: data.expense,
      bg: "rgba(239,68,68,0.08)",
      color: "#dc2626",
    },
    {
      label: "Investment",
      value: data.investment,
      bg: "rgba(59,130,246,0.08)",
      color: "#2563eb",
    },
    {
      label: "Savings",
      value: data.savings,
      bg: "rgba(168,85,247,0.08)",
      color: "#7c3aed",
    },
  ];

  return (
    <Grid container spacing={4} sx={{ mb: 4 }} justifyContent={"center"}>
      {kpis.map((kpi) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={3}
          key={kpi.label}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e6e8ec",
              backgroundColor: kpi.bg,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <Box
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "text.secondary",
                letterSpacing: 0.5,
              }}
            >
              {kpi.label}
            </Box>

            <Box
              sx={{
                fontSize: { xs: 22, sm: 24, md: 26 },
                fontWeight: 700,
                color: kpi.color,
              }}
            >
              ₹ {kpi.value.toLocaleString()}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}