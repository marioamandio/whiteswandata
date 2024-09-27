import { gql } from "@apollo/client";

export const GET_INDIVIDUAL_FIXTURES = gql`
  query {
    individualFixtures {
      fixture_id
      event_name
      event_number
      event_start_time
      runner
      sport_id
    }
  }
`;

export const GET_PARTICIPANT_FIXTURES = gql`
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
