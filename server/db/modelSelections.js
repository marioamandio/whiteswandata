import { connection } from "./connection.js";

const getModelSelectionsTable = () => connection.table("model_selections");

export async function getModelSelections() {
  return await getModelSelectionsTable().select();
}

export async function getModelSelectionsByFixtureID(fixture_id) {
  return await getModelSelectionsTable().select().where({ fixture_id });
}

export async function getModelSelectionByID(id) {
  return await getModelSelectionsTable().first().where({ selection_id: id });
}
