import { connection } from "./connection.js";

const getParticiapntFixturesTable = () =>
  connection.table("participant_fixtures");

export async function getParticipantFixtures() {
  return await getParticiapntFixturesTable().select();
}

export async function getParticipantFixtureByID(id) {
  return await getParticiapntFixturesTable().first().where({ fixture_id: id });
}
