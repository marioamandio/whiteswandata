export const getTableCellText = (
  column: { id: string },
  row: Record<string, unknown>
): string | number => {
  const keys = column.id.split(".");
  let v = row as unknown as string;

  keys.forEach((k) => {
    if (v && typeof v === "object" && k in v) {
      v = v[k];
    } else {
      v = "";
    }
  });

  return typeof v === "string" || typeof v === "number" ? v : "";
};
