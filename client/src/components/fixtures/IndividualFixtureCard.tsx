import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { green, yellow } from "@mui/material/colors";

const IndividualFixturesCard: FC<{
  event_name: string;
  event_number: number;
  event_start_time: string;
  runner: string;
  sport_id: string;
  resolved: boolean;
}> = ({
  event_name,
  event_number,
  event_start_time,
  runner,
  sport_id,
  resolved,
}) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {event_name}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Event Number: {event_number}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Start Date: {formatDate(event_start_time)}
        </Typography>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Runner: {runner}
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

export default IndividualFixturesCard;
