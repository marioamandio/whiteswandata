import { MockedProvider } from "@apollo/client/testing";
import ModelSelectionsTable, {
  GET_MODELS_SELECTIONS,
} from "../components/ModelSelectionsTable";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

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
          },
        ],
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
