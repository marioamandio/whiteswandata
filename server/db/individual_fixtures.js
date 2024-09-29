import { connection } from "./connection.js";

const getIndividualFixturesTable = () =>
  connection.table("individual_fixtures");

export async function getIndividualFixtures({
  sortBy,
  sortByDirection,
  resolved,
  searchQuery,
}) {
  const query = getIndividualFixturesTable();

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

export async function updateIndividualResolvedByFixtureId(
  fixture_id,
  newResolvedValue
) {
  try {
    await getIndividualFixturesTable()
      .where({ fixture_id })
      .update({ resolved: newResolvedValue });

    return "Updated resolved column";
  } catch (error) {
    console.error("Error updating resolved value:", error.message);
  }
}

export async function getIndividualFixtureByID(id) {
  return await getIndividualFixturesTable().first().where({ fixture_id: id });
}
