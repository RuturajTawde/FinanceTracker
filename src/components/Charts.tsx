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
  LineChart,
  Line,
} from "recharts";

import { Paper, Box } from "@mui/material";
import { calculateAnalytics } from "../utils/analytics";

const ALLOCATION_COLORS = {
  Expense: "#fca5a5",
  Investment: "#93c5fd",
  Savings: "#c4b5fd",
  Available: "#86efac",
};

export default function Charts({ transactions }: any) {
  const data = calculateAnalytics(transactions);

  // 🔹 Sort transactions for balance trend
  const balanceData = [...transactions]
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    )
    .map((t) => ({
      date: t.date,
      balance: Number(t.closingBalance),
    }));

  // 🔹 Category distribution
  const categoryData = Object.entries(data.categoryTotals)
    .map(([name, value]) => ({
      name,
      value: Number(value),
    }))
    .sort((a, b) => b.value - a.value);

  // 🔹 Expense vs Investment
  const allocationData = [
    { name: "Expense", value: Number(data.expense) },
    { name: "Investment", value: Number(data.investment) },
  ];

  const totalAllocation =
    Number(data.expense) + Number(data.investment);

  // 🔹 Salary Allocation %
  const salaryAllocationData = [
    {
      name: "Salary",
      Expense: data.expensePercent,
      Investment: data.investmentPercent,
      Savings: data.income
        ? (data.savings / data.income) * 100
        : 0,
      Available: data.availablePercent,
    },
  ];

  return (
    <Box display="grid" gap={3}>
      {/* 🔵 Balance Trend */}
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
          Account Balance Trend
        </Box>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={balanceData}>
            <defs>
              <linearGradient
                id="balanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366f1"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" tick={{ fontSize: 12 }} />

            <YAxis
              tickFormatter={(value) =>
                `₹${(value / 1000).toFixed(0)}k`
              }
            />

            <Tooltip
              formatter={(value: number) =>
                `₹ ${value.toLocaleString()}`
              }
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="url(#balanceGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* 🔵 Expense Distribution */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eef2f7",
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
              fill="#93c5fd"
              radius={[0, 8, 8, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* 🟢 Expense vs Investment Donut */}
      {/* <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eef2f7",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Box fontSize={16} fontWeight={600} mb={2}>
          Expense vs Investment Allocation
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={allocationData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              label={({ percent }) =>
                `${(percent * 100).toFixed(1)}%`
              }
              animationDuration={900}
            >
              {allocationData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    index === 0
                      ? "#fca5a5"
                      : "#93c5fd"
                  }
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

        <Box mt={2} fontSize={14} color="text.secondary">
          Total Allocated
        </Box>
        <Box fontSize={18} fontWeight={700}>
          ₹ {totalAllocation.toLocaleString()}
        </Box>
      </Paper> */}

      {/* 🟣 Salary Allocation */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #eef2f7",
          backgroundColor: "#ffffff",
        }}
      >
        <Box fontSize={16} fontWeight={600} mb={2}>
          Salary Allocation
        </Box>

        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            data={salaryAllocationData}
            layout="vertical"
            stackOffset="expand"
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
            />
            <Bar
              dataKey="Investment"
              stackId="a"
              fill={ALLOCATION_COLORS.Investment}
            />
            <Bar
              dataKey="Savings"
              stackId="a"
              fill={ALLOCATION_COLORS.Savings}
            />
            <Bar
              dataKey="Available"
              stackId="a"
              fill={ALLOCATION_COLORS.Available}
              radius={[0, 20, 20, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}