import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatDate } from "../utils/formatDate";

const TableHeaderIndividualFixtures: FC<{
  fixture: {
    event_name: string;
    fixtureType: string;
    event_start_time: string;
    fixture_id: string;
    event_number: string;
    runner: string;
    sport_id: string;
  };
}> = ({ fixture }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Box display={"flex"} flexDirection={"column"} gap="8px">
        <Typography variant="body1" fontWeight="bold">
          Event Name: {fixture.event_name}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Fixture: {fixture.fixtureType}
        </Typography>
        <Typography variant="body2">
          Start Time: {formatDate(fixture.event_start_time)}
        </Typography>
        <Typography variant="body2">
          Fixture ID: {fixture.fixture_id}
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap="8px">
        <Typography variant="body1">
          Event Number: {fixture.event_number}
        </Typography>
        <Typography variant="body2">Runner: {fixture.runner}</Typography>
        <Typography variant="body2">Sport ID: {fixture.sport_id}</Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderIndividualFixtures;
