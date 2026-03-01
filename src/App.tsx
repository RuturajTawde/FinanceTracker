import { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import Upload from "./components/Upload";
import TransactionTable from "./components/TransactionTable";
import Charts from "./components/Charts";
import MonthlyTrend from "./components/MonthlyTrend";
import Dashboard from "./components/Dashboard";

const AnimatedSwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  height: 36,
  padding: 0,
  display: "flex",

  "& .MuiSwitch-switchBase": {
    padding: 4,
    transitionDuration: "300ms",

    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: "#1e293b",
        opacity: 1,
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 28,
    height: 28,
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    transition: "0.3s ease",
  },

  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Full Screen Background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: darkMode ? "#121212" : "#f5f7fb",
        }}
      >
        {/* Main Content Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1600px",
            mx: "auto",
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
            <Box
              sx={{
                fontSize: 28,
                fontWeight: 700,
                background: "linear-gradient(90deg, #5b7cfa, #2a9d8f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Finance Dashboard
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Upload setTransactions={setTransactions} />

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 20,
                  backgroundColor: darkMode
                    ? "rgba(99,102,241,0.15)"
                    : "rgba(226,232,240,0.7)",
                  transition: "all 0.4s ease",
                  backdropFilter: "blur(6px)",
                }}
              >
                {darkMode ? (
                  <DarkModeIcon
                    sx={{
                      fontSize: 18,
                      color: "#6366f1",
                      transition: "0.3s",
                    }}
                  />
                ) : (
                  <LightModeIcon
                    sx={{
                      fontSize: 18,
                      color: "#f59e0b",
                      transition: "0.3s",
                    }}
                  />
                )}

                <AnimatedSwitch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </Box>
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
                  {/* TOP SECTION */}
                  <Box
                    display="grid"
                    gridTemplateColumns={{
                      xs: "1fr",
                      md: "1fr 2fr",
                    }}
                    gap={3}
                    mb={4}
                    alignItems="stretch"
                    width="100%"
                  >
                    {/* LEFT - KPI Column */}
                    <Box display="grid" gap={3}>
                      <Dashboard transactions={transactions} />
                    </Box>

                    {/* RIGHT - Charts */}
                    <Box display="grid" gap={3}>
                      <Charts transactions={transactions} />
                    </Box>
                  </Box>

                  {/* TABLE SECTION */}
                  <Box
                    sx={{
                      backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                      borderRadius: 3,
                      p: 3,
                      border: "1px solid #e6e8ec",
                    }}
                  >
                    <TransactionTable
                      transactions={transactions}
                      setTransactions={setTransactions}
                    />
                  </Box>
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
