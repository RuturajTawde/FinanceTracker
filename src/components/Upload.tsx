import { parseExcel } from "../utils/excelParser";
import { autoDetectCategory } from "../utils/categoryMatcher";

export default function Upload({ setTransactions }: any) {

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await parseExcel(file);

    const withCategory = data.map((row) => ({
      ...row,
      type: autoDetectCategory(row.description)
    }));

    setTransactions(withCategory);
  };

  return <input type="file" accept=".xlsx" onChange={handleFile} />;
}