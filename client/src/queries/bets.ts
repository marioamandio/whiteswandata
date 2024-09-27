import { gql } from "@apollo/client";

export const GET_BETS_PLACED = gql`
  query GetBets($fixture_id: ID, $selection_id: ID) {
    bets(fixture_id: $fixture_id, selection_id: $selection_id) {
      selection_id
      selection
      value
      bet_time
      stake_size
      price
      trader {
        trader_name
      }
    }
  }
`;
