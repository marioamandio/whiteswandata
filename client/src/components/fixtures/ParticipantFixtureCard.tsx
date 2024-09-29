import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { green, yellow } from "@mui/material/colors";

const ParticipantFixtureCard: FC<{
  event_start_time: string;
  fixture_id: string;
  participant_1: string;
  participant_2: string;
  sport_id: string;
  resolved: boolean;
}> = ({
  event_start_time,
  fixture_id,
  participant_1,
  participant_2,
  sport_id,
  resolved,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {participant_1} VS {participant_2}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Fixture ID: {fixture_id}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Event Start Time: {formatDate(event_start_time)}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Sport ID: {sport_id}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: resolved ? green[600] : yellow[600],
              marginRight: 1,
            }}
          />
          <Typography variant="body2">
            {resolved ? "Resolved" : "Pending Resolution"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParticipantFixtureCard;
