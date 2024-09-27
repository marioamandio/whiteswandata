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
