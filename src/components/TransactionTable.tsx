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
  TablePagination,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useState, useMemo } from "react";
import { CATEGORY_CONFIG } from "../config/categoryConfig";

type SortItem = {
  key: string;
  direction: "asc" | "desc";
};

const GROUP_BADGE_STYLES: Record<
  string,
  { bg: string; color: string }
> = {
  income: { bg: "rgba(34,197,94,0.12)", color: "#16a34a" },
  expense: { bg: "rgba(239,68,68,0.10)", color: "#dc2626" },
  investment: { bg: "rgba(59,130,246,0.12)", color: "#2563eb" },
  transfer: { bg: "rgba(148,163,184,0.15)", color: "#475569" },
};

export default function TransactionTable({
  transactions,
  setTransactions,
}: any) {
  const [sortConfig, setSortConfig] = useState<SortItem[]>([]);
  const [filterType, setFilterType] = useState<
    "all" | "income" | "expense"
  >("all");

  const [typeFilter, setTypeFilter] = useState<string>("all"); // ✅ NEW

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleReset = () => {
    setSortConfig([]);
    setFilterType("all");
    setTypeFilter("all"); // ✅ reset type filter
    setSearchTerm("");
    setPage(0);
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === key);

      if (!existing) {
        return [...prev, { key, direction: "asc" }];
      }

      if (existing.direction === "asc") {
        return prev.map((item) =>
          item.key === key ? { ...item, direction: "desc" } : item
        );
      }

      return prev.filter((item) => item.key !== key);
    });
  };

  const processedTransactions = useMemo(() => {
    let data = [...transactions];

    // 🔍 Search
    if (searchTerm.trim()) {
      data = data.filter((t) =>
        t.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // 🔎 Group Filter
    if (filterType !== "all") {
      data = data.filter((t) => {
        const config = CATEGORY_CONFIG.find(
          (c) => c.label === t.type
        );
        return config?.group === filterType;
      });
    }

    // ✅ Exact Type Filter
    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    // 🔃 Sort
    if (sortConfig.length > 0) {
      data.sort((a, b) => {
        for (let sort of sortConfig) {
          let aVal: any = a[sort.key];
          let bVal: any = b[sort.key];

          if (sort.key === "date") {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
          } else {
            aVal = Number(aVal) || 0;
            bVal = Number(bVal) || 0;
          }

          if (aVal !== bVal) {
            return sort.direction === "asc"
              ? aVal - bVal
              : bVal - aVal;
          }
        }
        return 0;
      });
    }

    return data;
  }, [transactions, sortConfig, filterType, typeFilter, searchTerm]);

  const paginatedData = processedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateRow = (
    absoluteIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...transactions];
    updated[absoluteIndex][field] = value;
    setTransactions(updated);
  };

  const renderSortIcon = (key: string) => {
    const item = sortConfig.find((s) => s.key === key);

    if (!item) {
      return (
        <ArrowUpwardIcon
          fontSize="inherit"
          sx={{ opacity: 0.3 }}
        />
      );
    }

    return item.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="inherit" />
    ) : (
      <ArrowDownwardIcon fontSize="inherit" />
    );
  };

  return (
    <Box>
      {/* Controls */}
      <Box display="flex" gap={2} mb={2} alignItems="center" flexWrap="wrap">
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

        <Select
          size="small"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(0);
          }}
        >
          <MenuItem value="all">All Types</MenuItem>
          {CATEGORY_CONFIG.map((c) => (
            <MenuItem key={c.label} value={c.label}>
              {c.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          size="small"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
        >
          Reset All
        </Button>
      </Box>

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
          {paginatedData.map((row: any, i: number) => {
            const absoluteIndex = page * rowsPerPage + i;
            const isBigExpense = Number(row.debit) > 10000;

            const categoryConfig = CATEGORY_CONFIG.find(
              (c) => c.label === row.type
            );

            const group = categoryConfig?.group || "";
            const badgeStyle = GROUP_BADGE_STYLES[group];

            return (
              <TableRow
                key={absoluteIndex}
                hover
                sx={{
                  backgroundColor: isBigExpense
                    ? "rgba(239,68,68,0.05)"
                    : "transparent",
                }}
              >
                <TableCell>
                  <TextField
                    value={row.date}
                    onChange={(e) =>
                      updateRow(absoluteIndex, "date", e.target.value)
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={row.description}
                    onChange={(e) =>
                      updateRow(
                        absoluteIndex,
                        "description",
                        e.target.value
                      )
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={row.credit}
                    onChange={(e) =>
                      updateRow(
                        absoluteIndex,
                        "credit",
                        e.target.value
                      )
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={row.debit}
                    onChange={(e) =>
                      updateRow(
                        absoluteIndex,
                        "debit",
                        e.target.value
                      )
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-block",
                      backgroundColor:
                        badgeStyle?.bg ||
                        "rgba(203,213,225,0.15)",
                      color:
                        badgeStyle?.color ||
                        "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Select
                      value={row.type}
                      onChange={(e) =>
                        updateRow(
                          absoluteIndex,
                          "type",
                          e.target.value
                        )
                      }
                      size="small"
                      variant="standard"
                      disableUnderline
                      sx={{
                        fontWeight: 600,
                        color: "inherit",
                        "& .MuiSelect-icon": {
                          color: "inherit",
                        },
                      }}
                    >
                      {CATEGORY_CONFIG.map((c) => (
                        <MenuItem key={c.label} value={c.label}>
                          {c.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={processedTransactions.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 20, 50]}
        sx={{
          borderTop: "1px solid #e5e7eb",
          mt: 2,
        }}
      />
    </Box>
  );
}