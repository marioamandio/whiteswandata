import { useQuery, gql } from "@apollo/client";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ParticipantFixtureCard from "./ParticipantFixtureCard";
import { Link } from "react-router-dom";

interface ParticipantFixture {
  event_start_time: string;
  fixture_id: string;
  participant_1: string;
  participant_2: string;
  sport_id: string;
}

interface GetModelSelectionsData {
  participantFixtures: ParticipantFixture[];
}

interface GetModelSelectionsVars {
  fixture_id?: string;
}

const GET_PARTICIPANT_FIXTURES = gql`
  query {
    participantFixtures {
      event_start_time
      fixture_id
      participant_1
      participant_2
      sport_id
    }
  }
`;

const ParticipantFixtures = () => {
  const {
    loading,
    error,
    data = { participantFixtures: [] },
  } = useQuery<GetModelSelectionsData, GetModelSelectionsVars>(
    GET_PARTICIPANT_FIXTURES
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h3" sx={{ marginBottom: "24px" }}>
        Participant Fixtures
      </Typography>

      <Grid container spacing={4}>
        {data.participantFixtures.map((fixture) => {
          return (
            <Grid size={4}>
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
    </div>
  );
};

export default ParticipantFixtures;
