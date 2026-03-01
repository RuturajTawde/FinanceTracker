import { Paper, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function AccountSnapshot({ data }: any) {
  const isPositive = data.netChange >= 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid #e6e8ec",
        backgroundColor: "#ffffff",
      }}
    >
      <Box fontSize={18} fontWeight={600} mb={3}>
        Account Snapshot
      </Box>

      <Box display="grid" gap={2}>
        {/* Current Balance */}
        <Box>
          <Box fontSize={14} color="text.secondary">
            Current Balance
          </Box>
          <Box fontSize={28} fontWeight={700}>
            ₹ {Number(data.closingBalance).toLocaleString()}
          </Box>
        </Box>

        {/* Net Change */}
        <Box display="flex" alignItems="center" gap={1}>
          {isPositive ? (
            <TrendingUpIcon sx={{ color: "#16a34a" }} />
          ) : (
            <TrendingDownIcon sx={{ color: "#dc2626" }} />
          )}

          <Box
            fontSize={16}
            fontWeight={600}
            color={isPositive ? "#16a34a" : "#dc2626"}
          >
            {isPositive ? "+" : "-"} ₹{" "}
            {Math.abs(data.netChange).toLocaleString()}
          </Box>

          <Box fontSize={13} color="text.secondary">
            Net Change
          </Box>
        </Box>

        {/* Lowest Balance */}
        <Box>
          <Box fontSize={14} color="text.secondary">
            Lowest Balance
          </Box>
          <Box fontSize={16} fontWeight={600}>
            ₹ {Number(data.lowestBalance).toLocaleString()}
          </Box>
        </Box>

        {/* Opening Balance */}
        <Box>
          <Box fontSize={14} color="text.secondary">
            Opening Balance
          </Box>
          <Box fontSize={16} fontWeight={600}>
            ₹ {Number(data.openingBalance).toLocaleString()}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}