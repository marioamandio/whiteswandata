import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import ResolveSelectionModal from "./ResolveSelectionModal";

const ResolveSelectionModelButton: FC<{
  selection_id: string;
  callback: () => void;
}> = ({ selection_id, callback }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ResolveSelectionModal
        open={showModal}
        setOpen={setShowModal}
        selection_id={selection_id}
        callback={callback}
      />
      <Button onClick={() => setShowModal(true)}>Resolve Outcome</Button>
    </Box>
  );
};

export default ResolveSelectionModelButton;
