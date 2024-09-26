import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};

const ParticipantFixtureCard: FC<{
  event_start_time: string;
  fixture_id: string;
  participant_1: string;
  participant_2: string;
  sport_id: string;
}> = ({
  event_start_time,
  fixture_id,
  participant_1,
  participant_2,
  sport_id,
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
      </CardContent>
    </Card>
  );
};

export default ParticipantFixtureCard;
