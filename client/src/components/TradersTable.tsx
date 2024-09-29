import { useQuery } from "@apollo/client";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import {
  formatNumberWithCommas,
  getTableCellText,
} from "../utils/parseCellsText";
import { GET_TRADERS } from "../queries/traders";
import { green, red } from "@mui/material/colors";
import { Column } from "../types";

interface Trader {
  trader_name: string;
  trader_id: string;
  bets: {
    bets_placed: {
      price: number;
      stake_size: number;
      selection_model: {
        outcome: {
          outcome: string;
        };
      };
    }[];
  };
}

interface GetTradersData {
  traders: Trader[];
}

interface GetTradersVars {
  searchQuery?: string;
}

const columns: readonly Column[] = [
  { id: "trader_name", label: "Trader Name", minWidth: 120 },
  { id: "amountOfBets", label: "total Bets", minWidth: 100, align: "right" },
  {
    id: "pendingBets",
    label: "Bets Pending",
    minWidth: 100,
    align: "right",
  },
  {
    id: "pendingAmount",
    label: "Amount Pending",
    minWidth: 150,
    align: "right",
    format: (value) => formatNumberWithCommas(Number(value)),
  },
  { id: "amountOfBetsLost", label: "Bets Lost", minWidth: 100, align: "right" },
  {
    id: "totalLost",
    label: "Total Loss",
    minWidth: 150,
    align: "right",
    format: (value) => formatNumberWithCommas(Number(value)),
  },
  {
    id: "successfulBets",
    label: "Successful Bets",
    minWidth: 150,
    align: "right",
  },
  {
    id: "totalEarned",
    label: "Total Profit",
    align: "right",
    format: (value) => formatNumberWithCommas(Number(value)),
  },
  {
    id: "netBalance",
    label: "Net Balance",
    align: "right",
    minWidth: 150,
    format: (value) => (
      <Box
        style={{
          padding: "4px 8px",
          backgroundColor: Number(value) >= 0 ? green[200] : red[200],
        }}
      >
        {formatNumberWithCommas(Number(value))}
      </Box>
    ),
  },
];

const TradersTable: FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const {
    loading,
    error,
    data = { traders: [] },
  } = useQuery<GetTradersData, GetTradersVars>(GET_TRADERS, {
    variables: { searchQuery },
    fetchPolicy: "cache-and-network",
  });

  const tradersData = useMemo(() => {
    return data.traders.map((trader) => {
      const totals = trader.bets.bets_placed.reduce(
        (acc, bet) => {
          const { price, stake_size, selection_model } = bet;
          const outcome = selection_model.outcome?.outcome;

          if (!outcome) {
            acc.pendingAmount += price * stake_size;
            acc.pendingBets++;
          } else if (outcome === "won") {
            acc.totalEarned += price * stake_size;
            acc.successfulBets++;
          } else {
            acc.totalLost += stake_size;
            acc.amountOfBetsLost++;
          }

          return acc;
        },
        {
          totalEarned: 0,
          totalLost: 0,
          amountOfBetsLost: 0,
          successfulBets: 0,
          pendingBets: 0,
          pendingAmount: 0,
        }
      );

      return {
        trader_name: trader.trader_name,
        trader_id: trader.trader_id,
        amountOfBets: trader.bets.bets_placed.length,
        ...totals,
        netBalance: totals.totalEarned - totals.totalLost,
      };
    });
  }, [data.traders]);

  if (loading) {
    return (
      <Box width="85vw">
        <p>Loading...</p>
      </Box>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%", position: "relative" }}>
            {tradersData.map((row) => {
              return (
                <Fragment key={row.trader_id}>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const v = getTableCellText(
                        column,
                        row as unknown as Record<string, unknown>
                      );

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(v) : v}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TradersTable;
