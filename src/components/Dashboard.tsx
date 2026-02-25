import { Paper, Box } from "@mui/material";
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
    <Box
      display="grid"
      gap={3}
    >
      {kpis.map((kpi) => (
        <Paper
          key={kpi.label}
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid #e6e8ec",
            backgroundColor: kpi.bg,
            minHeight: 140,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "text.secondary",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            {kpi.label}
          </Box>

          <Box
            sx={{
              fontSize: { xs: 24, md: 28, lg: 32 },
              fontWeight: 700,
              color: kpi.color,
            }}
          >
            ₹ {Number(kpi.value).toLocaleString()}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}