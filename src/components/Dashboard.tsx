import { Paper, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { calculateAnalytics } from "../utils/analytics";

export default function Dashboard({ transactions }: any) {
  const data = calculateAnalytics(transactions);

  const kpis = [
    {
      label: "Income",
      value: data.income,
      percent: 100,
      bg: "rgba(34,197,94,0.08)",
      color: "#16a34a",
    },
    {
      label: "Expense",
      value: data.expense,
      percent: data.expensePercent,
      bg: "rgba(239,68,68,0.08)",
      color: "#dc2626",
    },
    {
      label: "Investment",
      value: data.investment,
      percent: data.investmentPercent,
      bg: "rgba(59,130,246,0.08)",
      color: "#2563eb",
    },
    {
      label: "Savings",
      value: data.savings,
      percent: data.income ? (data.savings / data.income) * 100 : 0,
      bg: "rgba(168,85,247,0.08)",
      color: "#7c3aed",
    },
    {
      label: "Available Balance",
      value: data.available,
      percent: data.availablePercent,
      bg:
        data.available >= 0
          ? "rgba(16,185,129,0.08)"
          : "rgba(239,68,68,0.08)",
      color: data.available >= 0 ? "#10b981" : "#ef4444",
      showWarning: data.available < 0,
    },
    {
      label: "Financial Health",
      value: data.financialScore,
      percent: null,
      bg: "rgba(59,130,246,0.08)",
      color: "#2563eb",
      isScore: true,
    },
  ];

  return (
    <Box display="grid" gap={3}>
      {kpis.map((kpi) => (
        <Paper
          key={kpi.label}
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px solid #e6e8ec",
            backgroundColor: kpi.bg,
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "text.secondary",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            {kpi.label}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 24, md: 28, lg: 32 },
              fontWeight: 700,
              color: kpi.color,
            }}
          >
            {kpi.isScore
              ? `${kpi.value}/100`
              : `₹ ${Number(kpi.value).toLocaleString()}`}
          </Typography>

          {/* Percentage */}
          {kpi.percent !== null && (
            <Typography fontSize={13} color="text.secondary" mt={0.5}>
              {kpi.percent.toFixed(1)}% of salary
            </Typography>
          )}

          {/* Trend Arrow for Available */}
          {kpi.label === "Available Balance" && (
            <Box display="flex" alignItems="center" gap={0.5} mt={1}>
              {data.available >= 0 ? (
                <ArrowUpwardIcon sx={{ fontSize: 16, color: "#10b981" }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: 16, color: "#ef4444" }} />
              )}
              <Typography fontSize={12}>
                {data.available >= 0 ? "Surplus" : "Overspending"}
              </Typography>
            </Box>
          )}

          {/* Warning */}
          {kpi.showWarning && (
            <Typography
              fontSize={12}
              sx={{ color: "#ef4444", mt: 1 }}
            >
              ⚠ You are spending more than your income
            </Typography>
          )}

          {/* Health Label */}
          {kpi.isScore && (
            <Typography fontSize={13} color="text.secondary" mt={1}>
              {data.healthLabel}
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}