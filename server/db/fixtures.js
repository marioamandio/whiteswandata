import { connection } from "./connection.js";

const getFixturesTable = () => connection.table("fixtures");

export async function getFixtures({
  sortBy,
  sortByDirection,
  resolved,
  searchQuery,
}) {
  const query = getFixturesTable();

  if (!!searchQuery) {
    query.where((builder) => {
      builder
        .where("event_name", "like", `%${searchQuery}%`)
        .orWhere("runner", "like", `%${searchQuery}%`);
    });
  }

  if (typeof resolved === "boolean") {
    query.where({ resolved: resolved ? 1 : 0 });
  }

  if (sortBy) {
    query.orderBy(sortBy, sortByDirection || "asc");
  }

  const rows = await query.select();

  return rows.map((row) => {
    return {
      ...row,
      resolved: !!row.resolved,
    };
  });
}
