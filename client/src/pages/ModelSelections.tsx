import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import ModelSelectionsTable from "../components/ModelSelectionsTable";
import { useLocation, useNavigate } from "react-router-dom";
import TableHeaderIndividualFixtures from "../components/ModelSelectionsTableHeaderIndividual";
import TableHeaderParticipantFixtures from "../components/ModelSelectionsTableHeaderParticipants";

const ModelSelectionsPage = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const splitPaths = pathname.split("/");
  const { fixture } = state;
  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: "start", marginBottom: "16px" }}>
            <Button variant="contained" onClick={() => navigate("/")}>
              Back
            </Button>
          </Box>
          {fixture.fixtureType === "individual" && (
            <TableHeaderIndividualFixtures fixture={fixture} />
          )}
          {fixture.fixtureType === "participant" && (
            <TableHeaderParticipantFixtures fixture={fixture} />
          )}
          <Box>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Model Selections
            </Typography>
          </Box>
          <ModelSelectionsTable
            fixtureId={splitPaths[1]}
            fixtureType={fixture.fixtureType}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModelSelectionsPage;
