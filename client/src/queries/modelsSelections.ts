import { gql } from "@apollo/client";

export const GET_MODELS_SELECTIONS = gql`
  query GetModelSelections($fixture_id: ID) {
    modelSelections(fixture_id: $fixture_id) {
      selection_id
      fixture {
        fixture_type
        fixture_id
      }
      market {
        market_name
      }
      selection
      value
      bottom_price
      outcome {
        outcome
      }
    }
  }
`;

export const SUBMIT_SELECTION_OUTCOME = gql`
  mutation (
    $selection_id: ID!
    $fixture_id: ID!
    $fixture_type: String!
    $outcome: String!
  ) {
    resolveBet(
      selection_id: $selection_id
      fixture_id: $fixture_id
      fixture_type: $fixture_type
      outcome: $outcome
    ) {
      outcome
    }
  }
`;
