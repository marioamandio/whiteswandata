import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { SUBMIT_SELECTION_OUTCOME } from "../queries/modelsSelections";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const ResolveSelectionModal: FC<{
  payload: Record<string, string>;
  open: boolean;
  setOpen: (v: boolean) => void;
  callback?: () => void;
}> = ({ payload, open, setOpen, callback }) => {
  const [modelResolution, setModelResolution] = useState("");
  const [submitSelectionOutcome, { loading, error }] = useMutation(
    SUBMIT_SELECTION_OUTCOME,
    {
      awaitRefetchQueries: true,
      onCompleted: () => {
        if (callback) {
          callback();
        }
        setOpen(false);
      },
    }
  );

  const handleSubmitClick = () => {
    submitSelectionOutcome({
      variables: {
        ...payload,
        outcome: modelResolution,
      },
    });
  };

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography variant="h6" component="h2">
          Resolve Model Selection
        </Typography>
        <FormControl fullWidth variant="standard">
          <InputLabel>Outcome</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={modelResolution}
            label="Outcome"
            onChange={(event) =>
              setModelResolution(event.target.value as string)
            }
            data-testid="select-model-resolution"
          >
            <MenuItem value={"won"}>Won</MenuItem>
            <MenuItem value={"lost"}>Lost</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          disabled={!modelResolution || loading}
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      </StyledBox>
    </Modal>
  );
};

export default ResolveSelectionModal;
