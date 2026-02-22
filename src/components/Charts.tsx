import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { calculateAnalytics } from "../utils/analytics";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

export default function Charts({ transactions }: any) {
  const data = calculateAnalytics(transactions);

  // Pie Data (only expense categories)
  const pieData = Object.entries(data.categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value,
    }));

  // Monthly trend
  const monthlyTotals: Record<string, number> = {};

  transactions.forEach((t: any) => {
    if (!t.date) return;

    const month = t.date.substring(0, 7); // YYYY-MM

    if (!monthlyTotals[month]) monthlyTotals[month] = 0;

    if (t.debit > 0) {
      monthlyTotals[month] += Number(t.debit);
    }
  });

  const monthlyData = Object.entries(monthlyTotals).map(([month, value]) => ({
    month,
    value,
  }));

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* LEFT - PIE */}
      <div style={{ flex: 1 }}>
        <h3>Expense Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* RIGHT - BAR */}
      <div style={{ flex: 1 }}>
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pieData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
