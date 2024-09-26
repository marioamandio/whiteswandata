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
