export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
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
