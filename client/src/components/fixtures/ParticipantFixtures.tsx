import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import ParticipantFixtureCard from "./ParticipantFixtureCard";
import { Link } from "react-router-dom";
import { GET_PARTICIPANT_FIXTURES } from "../../queries/fixtures";
import { FC } from "react";

interface ParticipantFixture {
  event_start_time: string;
  fixture_id: string;
  participant_1: string;
  participant_2: string;
  sport_id: string;
  resolved: boolean;
}

interface GetModelSelectionsData {
  participantFixtures: ParticipantFixture[];
}

interface GetModelSelectionsVars {
  searchQuery?: string;
  resolved?: boolean;
}

const ParticipantFixtures: FC<{ resolved?: boolean; searchQuery: string }> = ({
  searchQuery,
  resolved,
}) => {
  const {
    loading,
    error,
    data = { participantFixtures: [] },
  } = useQuery<GetModelSelectionsData, GetModelSelectionsVars>(
    GET_PARTICIPANT_FIXTURES,
    {
      fetchPolicy: "cache-and-network",
      variables: { resolved, searchQuery },
    }
  );

  if (loading)
    return (
      <Box width="85vw">
        <p>Loading...</p>
      </Box>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid container spacing={4}>
      {data.participantFixtures.map((fixture) => {
        return (
          <Grid size={4} key={fixture.fixture_id}>
            <Link
              to={`/${fixture.fixture_id}`}
              state={{ fixture: { ...fixture, fixtureType: "participant" } }}
            >
              <ParticipantFixtureCard key={fixture.fixture_id} {...fixture} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ParticipantFixtures;
