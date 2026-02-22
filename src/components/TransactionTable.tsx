import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Select,
  MenuItem,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Button,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useState, useMemo } from "react";
import { CATEGORY_CONFIG } from "../config/categoryConfig";

type SortItem = {
  key: string;
  direction: "asc" | "desc";
};

export default function TransactionTable({
  transactions,
  setTransactions,
}: any) {
  const [sortConfig, setSortConfig] = useState<SortItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 RESET ALL
  const handleReset = () => {
    setSortConfig([]);
    setFilterType("all");
    setSearchTerm("");
  };

  // 🔹 SORT HANDLER (multi column)
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === key);

      if (!existing) {
        return [...prev, { key, direction: "asc" }];
      }

      if (existing.direction === "asc") {
        return prev.map((item) =>
          item.key === key ? { ...item, direction: "desc" } : item,
        );
      }

      return prev.filter((item) => item.key !== key);
    });
  };

  // 🔹 MAIN PROCESSOR
  const processedTransactions = useMemo(() => {
    let data = [...transactions];

    // SEARCH
    if (searchTerm.trim()) {
      data = data.filter((t) =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // FILTER
    if (filterType !== "all") {
      data = data.filter((t) => {
        const config = CATEGORY_CONFIG.find((c) => c.label === t.type);
        return config?.group === filterType;
      });
    }

    // SORT
    if (sortConfig.length > 0) {
      data.sort((a, b) => {
        for (let sort of sortConfig) {
          let aVal: any = a[sort.key];
          let bVal: any = b[sort.key];

          // Date sorting
          if (sort.key === "date") {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
          } else {
            aVal = Number(aVal) || 0;
            bVal = Number(bVal) || 0;
          }

          if (aVal !== bVal) {
            return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
          }
        }
        return 0;
      });
    }

    return data;
  }, [transactions, sortConfig, filterType, searchTerm]);

  const updateRow = (index: number, field: string, value: any) => {
    const updated = [...transactions];
    updated[index][field] = value;
    setTransactions(updated);
  };

  const renderSortIcon = (key: string) => {
    const item = sortConfig.find((s) => s.key === key);

    if (!item) {
      return <ArrowUpwardIcon fontSize="inherit" sx={{ opacity: 0.3 }} />;
    }

    return item.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="inherit" />
    ) : (
      <ArrowDownwardIcon fontSize="inherit" />
    );
  };

  return (
    <Box>
      {/* 🔥 CONTROLS */}
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={(_, value) => value && setFilterType(value)}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="income">Only Income</ToggleButton>
          <ToggleButton value="expense">Only Expense</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          size="small"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="outlined" size="small" onClick={handleReset}>
          Reset All
        </Button>
      </Box>

      {/* 🔥 TABLE WITH STICKY HEADER */}
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              Date
              <IconButton size="small" onClick={() => handleSort("date")}>
                {renderSortIcon("date")}
              </IconButton>
            </TableCell>

            <TableCell>Description</TableCell>

            <TableCell>
              Credit
              <IconButton size="small" onClick={() => handleSort("credit")}>
                {renderSortIcon("credit")}
              </IconButton>
            </TableCell>

            <TableCell>
              Debit
              <IconButton size="small" onClick={() => handleSort("debit")}>
                {renderSortIcon("debit")}
              </IconButton>
            </TableCell>

            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {processedTransactions.map((row: any, i: number) => {
            const isBigExpense = Number(row.debit) > 10000;

            return (
              <TableRow
                key={i}
                sx={{
                  backgroundColor: isBigExpense
                    ? "rgba(255,0,0,0.08)"
                    : "inherit",
                }}
              >
                <TableCell>
                  <TextField
                    value={row.date}
                    onChange={(e) => updateRow(i, "date", e.target.value)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={row.description}
                    onChange={(e) =>
                      updateRow(i, "description", e.target.value)
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={row.credit}
                    onChange={(e) => updateRow(i, "credit", e.target.value)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={row.debit}
                    onChange={(e) => updateRow(i, "debit", e.target.value)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Select
                    value={row.type}
                    onChange={(e) => updateRow(i, "type", e.target.value)}
                    size="small"
                  >
                    {CATEGORY_CONFIG.map((c) => (
                      <MenuItem key={c.label} value={c.label}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
