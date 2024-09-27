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
import { FC, Fragment, useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BetsPlacedSection from "./BetsPlaced";
import { getTableCellText } from "../utils/parseCellsText";
import { Column } from "../types";
import { GET_MODELS_SELECTIONS } from "../queries/modelsSelections";

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

const columns: readonly Column[] = [
  { id: "selection_id", label: "Selection ID", minWidth: 200 },
  { id: "selection", label: "Selection", minWidth: 200 },
  { id: "market.market_name", label: "Market", minWidth: 200 },
  { id: "value", label: "Value", minWidth: 200 },
  {
    id: "bottom_price",
    label: "Bottom Price",
    minWidth: 100,
    align: "right",
    format: (value) => Number(value).toFixed(2),
  },
  {
    id: "outcome.outcome",
    label: "Outcome",
    format: (value) => (
      <Box
        sx={{
          border: `1px solid ${value === "won" ? "#28a745" : "#dc3545"}`,
          color: value === "won" ? "#28a745" : "#dc3545",
          textAlign: "center",
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        {value}
      </Box>
    ),
  },
  {
    id: "expand",
    label: "expand",
    format: () => {
      return (
        <Box sx={{ height: "24px", width: "24px" }}>
          <KeyboardArrowDownIcon />
        </Box>
      );
    },
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
