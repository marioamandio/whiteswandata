import { connection } from "./connection.js";

const getParticiapntFixturesTable = () =>
  connection.table("participant_fixtures");

export async function getParticipantFixtures({
  sortBy,
  sortByDirection,
  resolved,
  searchQuery,
}) {
  const query = getParticiapntFixturesTable();

  if (!!searchQuery) {
    query.where((builder) => {
      builder
        .where("participant_1", "like", `%${searchQuery}%`)
        .orWhere("participant_2", "like", `%${searchQuery}%`);
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

export async function updateParticipantResolvedByFixtureId(
  fixture_id,
  newResolvedValue
) {
  try {
    await getParticiapntFixturesTable()
      .where({ fixture_id })
      .update({ resolved: newResolvedValue });

    return "Updated resolved column";
  } catch (error) {
    console.error("Error updating resolved value:", error.message);
  }
}

export async function getParticipantFixtureByID(id) {
  return await getParticiapntFixturesTable().first().where({ fixture_id: id });
}
