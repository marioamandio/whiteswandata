import { ReactNode } from "react";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number) => string | ReactNode;
}

export interface BetPlaced {
  selection_id: string;
  selection: string;
  value: number;
  bet_time: string;
  stake_size: number;
  price: number;
  trader: {
    trader_name: string;
  };
}
