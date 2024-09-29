import { MockedProvider } from "@apollo/client/testing";
import ModelSelectionsTable from "../components/ModelSelectionsTable";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  GET_MODELS_SELECTIONS,
  SUBMIT_SELECTION_OUTCOME,
} from "../queries/modelsSelections";

vi.mock("../components/BetsPlaced", () => ({
  default: () => <div>Mocked Bets Placed</div>,
}));

const mocks = [
  {
    request: {
      query: GET_MODELS_SELECTIONS,
      variables: {
        fixture_id: "2836661",
      },
    },
    result: {
      data: {
        modelSelections: [
          {
            bottom_price: 4.01,
            fixture: {
              fixture_id: "2836661",
              fixture_type: "individual",
            },
            market: {
              market_name: "Win",
            },
            selection: "Win",
            selection_id: "test_selection_id",
            value: "",
            outcome: null,
          },
          {
            bottom_price: 3.16,
            fixture: {
              fixture_id: "2836661",
              fixture_type: "individual",
            },
            market: {
              market_name: "Win",
            },
            selection: "Win",
            selection_id: "c37dad6d-78b6-4332-b12c-acec1ff82190",
            value: "",
            outcome: {
              outcome: "won",
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: SUBMIT_SELECTION_OUTCOME,
      variables: {
        selection_id: "test_selection_id",
        fixture_id: "2836661",
        fixture_type: "individual",
        outcome: "won",
      },
    },
    result: {
      data: {
        createItem: {
          id: "1",
          name: "Test Item",
        },
      },
    },
  },
];

test("Render Model Selections Table with Mock apollo client", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModelSelectionsTable fixtureId="2836661" fixtureType="individual" />
    </MockedProvider>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(async () => {
    expect(screen.getByText("3.16")).toBeInTheDocument();
    const selectionIDCell = screen.getByText(
      "c37dad6d-78b6-4332-b12c-acec1ff82190"
    );
    expect(selectionIDCell).toBeInTheDocument();

    expect(screen.queryByText("Bets Placed")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("3.16"));

    expect(screen.getByText("Mocked Bets Placed")).toBeInTheDocument();
  });
});

test("Test submit model resolution with correct values", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModelSelectionsTable fixtureId="2836661" fixtureType="individual" />
    </MockedProvider>
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(async () => {
    const resolveOutcomeButton = screen.getByText("Resolve Outcome");

    screen.getByText("4.01");

    fireEvent.click(resolveOutcomeButton);

    expect(screen.getByText("Resolve Model Selection")).toBeInTheDocument();
  });
});
