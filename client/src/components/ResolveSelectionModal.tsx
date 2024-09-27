import { gql, useMutation } from "@apollo/client";
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
} from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const SUBMIT_SELECTION_OUTCOME = gql`
  mutation ($selection_id: ID!, $outcome: String) {
    resolveBet(selection_id: $selection_id, outcome: $outcome) {
      outcome
    }
  }
`;

const ResolveSelectionModal: FC<{
  selection_id: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  callback: () => void;
}> = ({ selection_id, open, setOpen, callback }) => {
  const [modelResolution, setModelResolution] = useState("");
  const [submitSelectionOutcome, { loading, error }] = useMutation(
    SUBMIT_SELECTION_OUTCOME,
    {
      awaitRefetchQueries: true,
      onCompleted: () => {
        callback();
        setOpen(false);
      },
    }
  );

  const handleSubmitClick = () => {
    submitSelectionOutcome({
      variables: { selection_id, outcome: modelResolution },
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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Resolve Model Selection
        </Typography>
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">Outcome</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modelResolution}
            label="Outcome"
            onChange={(event) =>
              setModelResolution(event.target.value as string)
            }
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
      </Box>
    </Modal>
  );
};

export default ResolveSelectionModal;
