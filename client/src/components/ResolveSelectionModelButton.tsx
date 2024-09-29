import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import ResolveSelectionModal from "./ResolveSelectionModal";

const ResolveSelectionModelButton: FC<{
  payload: Record<string, string>;
  callback?: () => void;
}> = ({ payload, callback }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box onClick={(event) => event.stopPropagation()}>
      <ResolveSelectionModal
        open={showModal}
        setOpen={setShowModal}
        payload={payload}
        callback={callback}
      />
      <Button onClick={() => setShowModal(true)} variant="outlined">
        Resolve Outcome
      </Button>
    </Box>
  );
};

export default ResolveSelectionModelButton;
