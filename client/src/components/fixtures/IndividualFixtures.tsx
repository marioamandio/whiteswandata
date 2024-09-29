import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import IndividualFixturesCard from "./IndividualFixtureCard";
import { GET_INDIVIDUAL_FIXTURES } from "../../queries/fixtures";
import { FC } from "react";

interface IndividualFixture {
  event_name: string;
  fixture_id: string;
  sport_id: string;
  event_number: number;
  event_start_time: string;
  runner: string;
  resolved: boolean;
}

interface GetIndividualFixtureData {
  individualFixtures: IndividualFixture[];
}

interface GetIndividualFixtureVars {
  resolved?: boolean;
  searchQuery?: string;
}

const IndividualFixtures: FC<{ resolved?: boolean; searchQuery: string }> = ({
  resolved,
  searchQuery,
}) => {
  const {
    loading,
    error,
    data = { individualFixtures: [] },
  } = useQuery<GetIndividualFixtureData, GetIndividualFixtureVars>(
    GET_INDIVIDUAL_FIXTURES,
    {
      fetchPolicy: "cache-and-network",
      variables: { resolved, searchQuery },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
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
  );
};

export default IndividualFixtures;
