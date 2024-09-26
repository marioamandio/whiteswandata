import { connection } from "./connection.js";

const getMarketsTable = () => connection.table("markets");

export async function getMarketByID(id) {
  return await getMarketsTable().first().where({ market_id: id });
}
