import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import IndividualFixturesCard from "./IndividualFixtureCard";
import { GET_INDIVIDUAL_FIXTURES } from "../../queries/fixtures";

interface IndividualFixture {
  event_name: string;
  fixture_id: string;
  sport_id: string;
  event_number: number;
  event_start_time: string;
  runner: string;
}

interface GetIndividualFixtureData {
  individualFixtures: IndividualFixture[];
}

interface GetIndividualFixtureVars {
  fixture_id?: string;
}

const IndividualFixtures = () => {
  const {
    loading,
    error,
    data = { individualFixtures: [] },
  } = useQuery<GetIndividualFixtureData, GetIndividualFixtureVars>(
    GET_INDIVIDUAL_FIXTURES
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h3" sx={{ marginBottom: "24px" }}>
        Individual Fixtures
      </Typography>

      <Grid container spacing={4}>
        {data.individualFixtures.map((fixture) => {
          return (
            <Grid size={4} key={fixture.fixture_id}>
              <Link
                to={`/${fixture.fixture_id}`}
                state={{ fixture: { ...fixture, fixtureType: "individual" } }}
              >
                <IndividualFixturesCard key={fixture.fixture_id} {...fixture} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default IndividualFixtures;
