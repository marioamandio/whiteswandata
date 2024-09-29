export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-UK", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
