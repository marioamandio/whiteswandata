import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatDate } from "../utils/formatDate";

const TableHeaderParticipantFixtures: FC<{
  fixture: {
    participant_1: string;
    participant_2: string;
    fixtureType: string;
    event_start_time: string;
    sport_id: string;
    fixture_id: string;
  };
}> = ({ fixture }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Box display={"flex"} flexDirection={"column"} gap="8px">
        <Typography variant="body1" fontWeight="bold">
          Event: {fixture.participant_1} VS {fixture.participant_2}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Fixture: {fixture.fixtureType}
        </Typography>
        <Typography variant="body2">
          Start Time: {formatDate(fixture.event_start_time)}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap="8px">
        <Typography variant="body2">Sport ID: {fixture.sport_id}</Typography>
        <Typography variant="body2">
          Fixture ID: {fixture.fixture_id}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderParticipantFixtures;
