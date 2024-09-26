import { formatDate } from "../utils/formatDate";

describe("formatDate", () => {
  test("should format a valid date string correctly", () => {
    const dateString = "2023-05-28T12:00:00Z";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("28 May 2023 at 1:00:00 pm");
  });

  test("should handle a different valid date correctly", () => {
    const dateString = "2024-01-01T00:00:00Z";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("1 January 2024 at 12:00:00 am");
  });

  test("should handle invalid date strings gracefully", () => {
    const invalidDateString = "invalid-date";
    const formattedDate = formatDate(invalidDateString);
    expect(formattedDate).toBe("Invalid Date");
  });

  test("should handle empty string as date", () => {
    const emptyDateString = "";
    const formattedDate = formatDate(emptyDateString);
    expect(formattedDate).toBe("Invalid Date");
  });
});
