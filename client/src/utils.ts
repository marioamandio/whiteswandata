export const getTableCellText = (
  column: { id: string },
  row: Record<string, unknown>
): string | number => {
  const keys = column.id.split(".");
  let v = row;

  keys.forEach((k) => {
    if (v && typeof v === "object" && k in v) {
      v = v[k];
    } else {
      v = "";
    }
  });

  return typeof v === "string" || typeof v === "number" ? v : "";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-UK", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};
