import { gql } from "@apollo/client";

export const GET_TRADERS = gql`
  query GetTraders($searchQuery: String) {
    traders(searchQuery: $searchQuery) {
      trader_name
      trader_id
      bets {
        bets_placed {
          price
          stake_size
          selection_model {
            outcome {
              outcome
            }
          }
        }
      }
    }
  }
`;
