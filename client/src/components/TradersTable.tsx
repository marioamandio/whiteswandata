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
  Typography,
} from "@mui/material";
import { Fragment, ReactNode, useMemo } from "react";
import {
  formatNumberWithCommas,
  getTableCellText,
} from "../utils/parseCellsText";
import { GET_TRADERS } from "../queries/traders";

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

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number) => string | ReactNode;
}

const columns: readonly Column[] = [
  { id: "trader_name", label: "Trader Name", minWidth: 150 },
  { id: "amountOfBets", label: "total Bets", minWidth: 100, align: "right" },
  { id: "amountOfBetsLost", label: "Bets Lost", minWidth: 100, align: "right" },
  {
    id: "totalLost",
    label: "Total Loss",
    minWidth: 200,
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
    minWidth: 200,
    align: "right",
    format: (value) => formatNumberWithCommas(Number(value)),
  },
  {
    id: "netBalance",
    label: "Net Balance",
    align: "right",
    minWidth: 200,
    format: (value) => formatNumberWithCommas(Number(value)),
  },
];

const TradersTable = () => {
  const {
    loading,
    error,
    data = { traders: [] },
  } = useQuery<GetTradersData>(GET_TRADERS);

  const tradersData = useMemo(() => {
    return data.traders.map((trader) => {
      const amountOfBets = trader.bets.bets_placed.length;
      const totals = trader.bets.bets_placed.reduce(
        (acc, cur) => {
          if (cur.selection_model.outcome.outcome === "won") {
            return {
              ...acc,
              totalEarned: acc.totalEarned + cur.price * cur.stake_size,
              successfulBets: acc.successfulBets + 1,
            };
          }
          return {
            ...acc,
            totalLost: acc.totalEarned + cur.price * cur.stake_size,
            amountOfBetsLost: acc.amountOfBetsLost + 1,
          };
        },
        {
          totalEarned: 0,
          totalLost: 0,
          amountOfBetsLost: 0,
          successfulBets: 0,
        }
      );

      return {
        trader_name: trader.trader_name,
        trader_id: trader.trader_id,
        amountOfBets,
        ...totals,
        netBalance: totals.totalEarned - totals.totalLost,
      };
    });
  }, [data.traders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: "24px" }}>
        Traders
      </Typography>
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      style={{ cursor: "pointer" }}
                    >
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
    </Box>
  );
};

export default TradersTable;
