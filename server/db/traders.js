import { connection } from "./connection.js";

const getTradersTable = () => connection.table("traders");

export async function getTraders() {
  return await getTradersTable().select();
}

export async function getTraderByID(id) {
  return await getTradersTable().first().where({ trader_id: id });
}
