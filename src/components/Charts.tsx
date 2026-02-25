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

  const totalAllocation =
    Number(data.expense) + Number(data.investment);

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
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{ left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString()}`
              }
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
            />
            <Tooltip
              formatter={(value: number) =>
                `₹ ${value.toLocaleString()}`
              }
            />
            <Bar
              dataKey="value"
              fill="#5b7cfa"
              radius={[0, 6, 6, 0]}
            />
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
              label={({ percent }) =>
                `${(percent * 100).toFixed(1)}%`
              }
            >
              {allocationData.map((_, index) => (
                <Cell
                  key={index}
                  fill={index === 0 ? "#dc2626" : "#16a34a"}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) =>
                `₹ ${value.toLocaleString()}`
              }
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
    </Box>
  );
}