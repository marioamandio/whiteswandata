import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { BetPlaced, Column } from "../types";
import { formatDate } from "../utils/formatDate";
import {
  formatNumberWithCommas,
  getTableCellText,
} from "../utils/parseCellsText";

interface BetsData {
  bets: BetPlaced[];
}

interface GetBetsVars {
  fixture_id?: string;
  selection_id?: string;
}

const GET_BETS_PLACED = gql`
  query GetBets($fixture_id: ID, $selection_id: ID) {
    bets(fixture_id: $fixture_id, selection_id: $selection_id) {
      selection_id
      selection
      value
      bet_time
      stake_size
      price
      trader {
        trader_name
      }
    }
  }
`;

const columns: readonly Column[] = [
  { id: "trader.trader_name", label: "Trader" },
  { id: "selection", label: "Selection" },
  { id: "value", label: "Value" },
  {
    id: "bet_time",
    label: "Bet Time",
    format: (value) => formatDate(`${value}`),
  },
  { id: "stake_size", label: "Stake Size" },
  { id: "price", label: "Price" },
  {
    id: "bet_size",
    label: "Bet Size",
    align: "right",
    format: (value) => formatNumberWithCommas(Number(value)),
  },
];

const BetsPlacedSection: FC<{
  fixtureId: string;
  selectionId: string;
  fixtureType: string;
}> = ({ fixtureId, selectionId, fixtureType }) => {
  const {
    loading,
    error,
    data = { bets: [] },
  } = useQuery<BetsData, GetBetsVars>(GET_BETS_PLACED, {
    variables: { fixture_id: fixtureId, selection_id: selectionId },
  });

  const filteredColumns = useMemo(() => {
    if (fixtureType === "individual") {
      return columns.filter((column) => {
        return column.id !== "value";
      });
    }
    return columns;
  }, [fixtureType]);

  const bets = useMemo(() => {
    return data.bets.map((bet) => {
      return {
        ...bet,
        bet_size: bet.price * bet.stake_size,
      };
    });
  }, [data.bets]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Box>
        <Typography variant="h5">Bets Placed</Typography>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {filteredColumns.map((column) => (
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
              {bets.map((row, idx) => {
                return (
                  <Fragment key={`${row.selection_id}${idx}`}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {filteredColumns.map((column) => {
                        const value = getTableCellText(
                          column,
                          row as unknown as Record<string, unknown>
                        );

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
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
      </Box>
    </>
  );
};

export default BetsPlacedSection;
