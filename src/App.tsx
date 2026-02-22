import { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Switch,
} from "@mui/material";
import Upload from "./components/Upload";
import TransactionTable from "./components/TransactionTable";
import Charts from "./components/Charts";
import MonthlyTrend from "./components/MonthlyTrend";
import { Button, Box } from "@mui/material";

function App() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState<"dashboard" | "monthly">("dashboard");

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: darkMode ? "dark" : "light" },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        Dark Mode
        <Upload setTransactions={setTransactions} />
        {transactions.length > 0 && (
          <>
            {/* PAGE SWITCH BUTTONS */}
            <Box mb={2} display="flex" gap={2}>
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
                <Charts transactions={transactions} />
                <TransactionTable
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              </>
            )}

            {page === "monthly" && <MonthlyTrend transactions={transactions} />}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
