import {
  LineChart, Line,
  XAxis, YAxis, Tooltip,
  CartesianGrid, Legend,
  ResponsiveContainer
} from "recharts";

export default function MonthlyTrend({ transactions }: any) {

  const monthlyTotals: Record<string, number> = {};

  transactions.forEach((t: any) => {
    if (!t.date) return;

    const month = t.date.substring(0, 7);

    if (!monthlyTotals[month]) monthlyTotals[month] = 0;

    if (t.debit > 0) {
      monthlyTotals[month] += Number(t.debit);
    }
  });

  const monthlyData = Object.entries(monthlyTotals).map(
    ([month, value]) => ({ month, value })
  );

  return (
    <div>
      <h2>Monthly Expense Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}