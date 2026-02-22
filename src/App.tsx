import { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  Button,
  Box,
} from "@mui/material";

import Upload from "./components/Upload";
import TransactionTable from "./components/TransactionTable";
import Charts from "./components/Charts";
import MonthlyTrend from "./components/MonthlyTrend";
import Dashboard from "./components/Dashboard"; // ✅ KPI Component

function App() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState<"dashboard" | "monthly">("dashboard");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Outer Background */}
      {/* Full Screen Background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: darkMode ? "#121212" : "#f5f7fb",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Centered Content */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1400px",
            px: { xs: 2, sm: 4, md: 6 },
            py: 4,
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Box fontSize={22} fontWeight={600}>
              Finance Dashboard
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Upload setTransactions={setTransactions} />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </Box>
          </Box>

          {transactions.length > 0 && (
            <>
              {/* Page Switch */}
              <Box mb={3} display="flex" gap={2}>
                <Button
                  variant={page === "dashboard" ? "contained" : "outlined"}
                  onClick={() => setPage("dashboard")}
                >
                  Dashboard
                </Button>

                <Button
                  variant={page === "monthly" ? "contained" : "outlined"}
                  onClick={() => setPage("monthly")}
                >
                  Monthly Trend
                </Button>
              </Box>

              {page === "dashboard" && (
                <>
                  {/* ✅ KPI Cards */}
                  <Box mb={3}>
                    <Dashboard transactions={transactions} />
                  </Box>

                  {/* Charts */}
                  <Box mb={3}>
                    <Charts transactions={transactions} />
                  </Box>

                  {/* Table */}
                  <TransactionTable
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                </>
              )}

              {page === "monthly" && (
                <MonthlyTrend transactions={transactions} />
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;