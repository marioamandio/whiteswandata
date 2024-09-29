import { connection } from "./connection.js";

const getTradersTable = () => connection.table("traders");

export async function getTraders({ searchQuery }) {
  const query = getTradersTable();

  if (searchQuery) {
    query.where("trader_name", "like", `%${searchQuery}%`);
  }

  return await query.select();
}

export async function getTraderByID(id) {
  return await getTradersTable().first().where({ trader_id: id });
}
