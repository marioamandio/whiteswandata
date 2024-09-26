import { useQuery, gql } from "@apollo/client";
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
import { FC, Fragment, ReactNode, useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BetsPlacedSection from "./BetsPlaced";
import { getTableCellText } from "../utils/parseCellsText";

interface ModelSelection {
  selection_id: string;
  fixture: {
    fixture_type: string;
    fixture_id: string;
  };
  market: {
    market_name: string;
  };
  selection: string;
  value: number;
  bottom_price: number;
}

interface GetModelSelectionsData {
  modelSelections: ModelSelection[];
}

interface GetModelSelectionsVars {
  fixture_id?: string;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number) => string | ReactNode;
}

const GET_MODELS_SELECTIONS = gql`
  query GetModelSelections($fixture_id: ID) {
    modelSelections(fixture_id: $fixture_id) {
      selection_id
      fixture {
        fixture_type
        fixture_id
      }
      market {
        market_name
      }
      selection
      value
      bottom_price
    }
  }
`;

const columns: readonly Column[] = [
  { id: "selection_id", label: "Selection ID", minWidth: 170 },
  { id: "selection", label: "Selection", minWidth: 100 },
  { id: "market.market_name", label: "Market", minWidth: 100 },
  { id: "value", label: "Value", minWidth: 100 },
  {
    id: "bottom_price",
    label: "Bottom Price",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "expand",
    label: "expand",
    format: () => (
      <Box sx={{ height: "24px", width: "24px" }}>
        <KeyboardArrowDownIcon />
      </Box>
    ),
  },
];

const ModelSelectionsTable: FC<{ fixtureId: string; fixtureType: string }> = ({
  fixtureId,
  fixtureType,
}) => {
  const {
    loading,
    error,
    data = { modelSelections: [] },
  } = useQuery<GetModelSelectionsData, GetModelSelectionsVars>(
    GET_MODELS_SELECTIONS,
    {
      variables: { fixture_id: fixtureId },
    }
  );

  const [selectedRow, setSelectedRow] = useState<ModelSelection | null>(null);

  const filteredColumns = useMemo(() => {
    if (fixtureType === "individual") {
      return columns.filter((column) => {
        return column.id !== "value";
      });
    }
    return columns;
  }, [fixtureType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
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
            {data.modelSelections.map((row) => {
              return (
                <Fragment key={row.selection_id}>
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedRow((currentRow) => {
                        return currentRow &&
                          currentRow.selection_id === row.selection_id
                          ? null
                          : row;
                      });
                    }}
                  >
                    {filteredColumns.map((column) => {
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
                  {selectedRow &&
                    selectedRow.selection_id === row.selection_id && (
                      <TableRow>
                        <TableCell colSpan={filteredColumns.length}>
                          <Box>
                            <BetsPlacedSection
                              selectionId={row.selection_id}
                              fixtureId={fixtureId}
                              fixtureType={fixtureType}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ModelSelectionsTable;
