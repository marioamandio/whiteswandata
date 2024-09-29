import { connection } from "./connection.js";

const getModelSelectionsOutcomesTable = () =>
  connection.table("model_selections_resolutions");

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

export async function insertModelSelectionOutcome({
  fixture_id,
  selection_id,
  outcome,
}) {
  try {
    await getModelSelectionsOutcomesTable()
      .insert({ selection_id, outcome, fixture_id })
      .onConflict("selection_id")
      .merge();

    const updatedRow = await getModelSelectionsOutcomesTable()
      .where({ selection_id })
      .first();

    const totalCount = await getModelSelectionsOutcomesTable()
      .where({ fixture_id })
      .count({ total: "*" })
      .first();

    return {
      ...updatedRow,
      amountOfResolvedPerFixture: totalCount.total,
    };
  } catch (error) {
    console.error("Error during upsert operation:", error);
    return { success: false, message: error.message };
  }
}
