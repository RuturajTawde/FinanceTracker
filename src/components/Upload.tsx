import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { parseExcel } from "../utils/excelParser";
import { autoDetectCategory } from "../utils/categoryMatcher";

export default function Upload({ setTransactions }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploaded, setUploaded] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setUploaded(false);

    const data = await parseExcel(file);

    const withCategory = data.map((row: any) => ({
      ...row,
      type: autoDetectCategory(
        row.description,
        Number(row.credit),
        Number(row.debit)
      )
    }));

    const sorted = withCategory.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setTransactions(withCategory);
    setUploaded(true);
  };

  return (
    <Box
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      sx={{
        cursor: "pointer",
        px: 3,
        py: 1.5,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        border: "1px dashed #5b7cfa",
        background:
          "linear-gradient(135deg, rgba(91,124,250,0.08), rgba(91,124,250,0.02))",
        transition: "all 0.3s ease",
        "&:hover": {
          background:
            "linear-gradient(135deg, rgba(91,124,250,0.15), rgba(91,124,250,0.05))",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 18px rgba(91,124,250,0.2)",
        },
      }}
    >
      {uploaded ? (
        <CheckCircleIcon sx={{ color: "#2a9d8f" }} />
      ) : (
        <CloudUploadIcon sx={{ color: "#5b7cfa" }} />
      )}

      <Box>
        <Typography fontSize={14} fontWeight={600}>
          {uploaded ? "File Uploaded Successfully" : "Upload Transactions"}
        </Typography>

        <Typography fontSize={12} color="text.secondary">
          {fileName ? fileName : "Click or drag .xlsx file here"}
        </Typography>
      </Box>

      <input
        hidden
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={(e) =>
          e.target.files && handleFile(e.target.files[0])
        }
      />
    </Box>
  );
}