import { gql } from "@apollo/client";

export const GET_INDIVIDUAL_FIXTURES = gql`
  query GetIndividualFixtures($resolved: Boolean, $searchQuery: String) {
    individualFixtures(resolved: $resolved, searchQuery: $searchQuery) {
      fixture_id
      event_name
      event_number
      event_start_time
      runner
      sport_id
      resolved
    }
  }
`;

export const GET_PARTICIPANT_FIXTURES = gql`
  query GetParticipantFixtures($resolved: Boolean, $searchQuery: String) {
    participantFixtures(resolved: $resolved, searchQuery: $searchQuery) {
      event_start_time
      fixture_id
      participant_1
      participant_2
      sport_id
      resolved
    }
  }
`;
