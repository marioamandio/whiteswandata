import { connection } from "./connection.js";

const getModelSelectionsOutcomesTable = () =>
  connection.table("model_selections_outcomes");

export async function getModelSelectionsOutcomes() {
  return await getModelSelectionsOutcomesTable().select();
}

export async function getModelSelectionsOutcome(selection_id) {
  const outcome = await getModelSelectionsOutcomesTable()
    .where({ selection_id })
    .first()
    .select();

  return outcome;
}
