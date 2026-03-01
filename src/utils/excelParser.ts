import * as XLSX from "xlsx";

const excelDateToJSDate = (serial: number) => {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const wholeDays = Math.floor(serial); // remove decimal time
  const milliseconds = wholeDays * 24 * 60 * 60 * 1000;

  const date = new Date(excelEpoch.getTime() + milliseconds);
  return date.toISOString().split("T")[0];
};

export const parseExcel = async (file: File) => {
  return new Promise<any[]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);

        const workbook = XLSX.read(data, {
          type: "array"
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const json: any[] = XLSX.utils.sheet_to_json(sheet, {
          raw: true
        });

        const formatted = json.map((row) => {
          const dateValue = row.date || row.Date;
          const descriptionValue = row.description || row.Description;
          const creditValue = row.credit || row.Credit;
          const debitValue = row.debit || row.Debit;
          const balanceValue =
            row.closingBalance ||
            row.ClosingBalance ||
            row["Closing Balance"] ||
            row.balance ||
            row.Balance;

          let formattedDate = "";

          if (typeof dateValue === "number") {
            formattedDate = excelDateToJSDate(dateValue);
          } else if (dateValue instanceof Date) {
            formattedDate = dateValue.toISOString().split("T")[0];
          } else {
            formattedDate = dateValue || "";
          }

          return {
            id: crypto.randomUUID(),
            date: formattedDate,
            description: descriptionValue || "",
            credit: Number(String(creditValue).replace(/,/g, "")) || 0,
            debit: Number(String(debitValue).replace(/,/g, "")) || 0,
            closingBalance:
              Number(String(balanceValue).replace(/,/g, "")) || 0
          };
        });

        resolve(formatted);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};