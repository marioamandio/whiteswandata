import { connection } from "./connection.js";

const getIndividualFixturesTable = () =>
  connection.table("individual_fixtures");

export async function getIndividualFixtures() {
  return await getIndividualFixturesTable().select();
}

export async function getIndividualFixtureByID(id) {
  return await getIndividualFixturesTable().first().where({ fixture_id: id });
}
