import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatDate } from "../utils/formatDate";
import { green, yellow } from "@mui/material/colors";

const TableHeaderParticipantFixtures: FC<{
  fixture: {
    participant_1: string;
    participant_2: string;
    fixtureType: string;
    event_start_time: string;
    sport_id: string;
    fixture_id: string;
    resolved: boolean;
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: fixture.resolved ? green[600] : yellow[600],
              marginRight: 1,
            }}
          />
          <Typography variant="body2">
            {fixture.resolved ? "Resolved" : "Pending Resolution"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TableHeaderParticipantFixtures;
