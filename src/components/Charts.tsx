import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Paper, Box } from "@mui/material";
import { calculateAnalytics } from "../utils/analytics";

const COLORS = ["#5b7cfa", "#16a34a", "#dc2626"];

const ALLOCATION_COLORS = {
  Expense: "#fca5a5", // soft red
  Investment: "#93c5fd", // soft blue
  Savings: "#c4b5fd", // soft purple
  Available: "#86efac", // soft green
};

export default function Charts({ transactions }: any) {
  const data = calculateAnalytics(transactions);

  // 🔹 Category distribution (sorted)
  const categoryData = Object.entries(data.categoryTotals)
    .map(([name, value]) => ({
      name,
      value: Number(value),
    }))
    .sort((a, b) => b.value - a.value);

  // 🔹 Expense vs Investment donut data
  const allocationData = [
    {
      name: "Expense",
      value: Number(data.expense),
    },
    {
      name: "Investment",
      value: Number(data.investment),
    },
  ];

  const totalAllocation = Number(data.expense) + Number(data.investment);

  // 🔥 Salary Allocation (percentage based)
  const salaryAllocationData = [
    {
      name: "Salary",
      Expense: data.expensePercent,
      Investment: data.investmentPercent,
      Savings: data.income ? (data.savings / data.income) * 100 : 0,
      Available: data.availablePercent,
    },
  ];

  return (
    <Box display="grid" gap={3}>
      {/* 🔵 Expense Distribution - Horizontal Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid #e6e8ec",
          backgroundColor: "#ffffff",
        }}
      >
        <Box fontSize={16} fontWeight={600} mb={2}>
          Expense Distribution
        </Box>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) => `₹${Number(value).toLocaleString()}`}
            />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip
              formatter={(value: number) => `₹ ${value.toLocaleString()}`}
            />
            <Bar dataKey="value" fill="#5b7cfa" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* 🟢 Expense vs Investment Allocation - Donut */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid #e6e8ec",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Box fontSize={16} fontWeight={600} mb={2}>
          Expense vs Investment Allocation
        </Box>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={allocationData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={4}
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {allocationData.map((_, index) => (
                <Cell key={index} fill={index === 0 ? "#dc2626" : "#16a34a"} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => `₹ ${value.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Display */}
        <Box mt={2} fontSize={14} color="text.secondary">
          Total Allocated
        </Box>
        <Box fontSize={18} fontWeight={700}>
          ₹ {totalAllocation.toLocaleString()}
        </Box>
      </Paper>

      {/* 🟣 Salary Allocation - Premium 100% Stacked Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eef2f7",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Box fontSize={16} fontWeight={600} mb={2}>
          Salary Allocation
        </Box>

        <ResponsiveContainer width="100%" height={140}>
          <BarChart
            data={salaryAllocationData}
            layout="vertical"
            stackOffset="expand"
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />

            <YAxis type="category" dataKey="name" hide />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(1)}%`,
                name,
              ]}
            />

            <Bar
              dataKey="Expense"
              stackId="a"
              fill={ALLOCATION_COLORS.Expense}
              radius={[20, 0, 0, 20]}
              animationDuration={900}
            />

            <Bar
              dataKey="Investment"
              stackId="a"
              fill={ALLOCATION_COLORS.Investment}
              animationDuration={900}
            />

            <Bar
              dataKey="Savings"
              stackId="a"
              fill={ALLOCATION_COLORS.Savings}
              animationDuration={900}
            />

            <Bar
              dataKey="Available"
              stackId="a"
              fill={ALLOCATION_COLORS.Available}
              radius={[0, 20, 20, 0]}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mt={2}
        >
          {Object.entries(ALLOCATION_COLORS).map(([key, color]) => (
            <Box key={key} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
              <Box fontSize={13} color="text.secondary">
                {key}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
