import { connection } from "./connection.js";

const getBetsPlacedTable = () => connection.table("bets_placed");

export const getBetsPlaced = async (fixture_id, selection_id) => {
  return await getBetsPlacedTable()
    .where({ fixture_id, selection_id })
    .select();
};

export const getBetsPlacedByModelSelection = async (selection_id) => {
  return await getBetsPlacedTable().select().where({ selection_id });
};

export const getBetsByTraderId = async (trader_id) => {
  return await getBetsPlacedTable().where({ trader_id }).select();
};
