import { resolvers } from "../resolvers";
import { getBetsPlaced, getBetsByTraderId } from "../db/betsPlaced";
import { getTraderByID, getTraders } from "../db/traders";
import { getMarketByID } from "../db/markets";
import { getIndividualFixtureByID } from "../db/individual_fixtures";
import { getParticipantFixtureByID } from "../db/participant_fixtures";
import { getModelSelectionsByFixtureID } from "../db/modelSelections";

jest.mock("../db/betsPlaced");
jest.mock("../db/traders");
jest.mock("../db/markets");
jest.mock("../db/individual_fixtures");
jest.mock("../db/participant_fixtures");
jest.mock("../db/modelSelections");

describe("Resolvers", () => {
  describe("Query.bets", () => {
    it("should call getBetsPlaced and return bets", async () => {
      const mockBets = [{ id: 1, stake_size: 50 }];
      getBetsPlaced.mockResolvedValue(mockBets);

      const result = await resolvers.Query.bets(null, {
        fixture_id: "test_fixture",
        selection_id: "test_selection",
      });

      expect(getBetsPlaced).toHaveBeenCalledWith(
        "test_fixture",
        "test_selection"
      );
      expect(result).toEqual(mockBets);
    });
  });

  describe("Query.traders", () => {
    it("should call getTraders and return traders", async () => {
      const mockTraders = [{ id: 1, name: "John Doe" }];
      getTraders.mockResolvedValue(mockTraders);

      const result = await resolvers.Query.traders();

      expect(getTraders).toHaveBeenCalled();
      expect(result).toEqual(mockTraders);
    });
  });

  describe("Trader.bets", () => {
    it("should return the total amount and bets placed for a trader", async () => {
      const mockBets = [
        { stake_size: 50, price: 2 },
        { stake_size: 30, price: 3 },
      ];
      getBetsByTraderId.mockResolvedValue(mockBets);

      const result = await resolvers.Trader.bets({ trader_id: "test_trader" });

      const expectedTotal = 50 * 2 + 30 * 3;

      expect(getBetsByTraderId).toHaveBeenCalledWith("test_trader");
      expect(result).toEqual({
        bets_placed: mockBets,
        total_amount: expectedTotal.toFixed(2),
      });
    });
  });

  describe("Query.modelSelections", () => {
    it("should return model selections by fixture ID", async () => {
      const mockSelections = [{ id: 1, selection: "test_selection" }];
      getModelSelectionsByFixtureID.mockResolvedValue(mockSelections);

      const result = await resolvers.Query.modelSelections(null, {
        fixture_id: "test_fixture",
      });

      expect(getModelSelectionsByFixtureID).toHaveBeenCalledWith(
        "test_fixture"
      );
      expect(result).toEqual(mockSelections);
    });
  });

  describe("Bet.trader", () => {
    it("should return a trader by trader ID", async () => {
      const mockTrader = { id: "trader1", name: "Trader One" };
      getTraderByID.mockResolvedValue(mockTrader);

      const result = await resolvers.Bet.trader({ trader_id: "trader1" });

      expect(getTraderByID).toHaveBeenCalledWith("trader1");
      expect(result).toEqual(mockTrader);
    });
  });

  describe("Bet.market", () => {
    it("should return a market by market ID", async () => {
      const mockMarket = { id: "market1", name: "Market One" };
      getMarketByID.mockResolvedValue(mockMarket);

      const result = await resolvers.Bet.market({ market_id: "market1" });

      expect(getMarketByID).toHaveBeenCalledWith("market1");
      expect(result).toEqual(mockMarket);
    });
  });

  describe("Bet.fixture", () => {
    it("should return an individual fixture by fixture ID", async () => {
      const mockFixture = { id: "fixture1", type: "individual" };
      getIndividualFixtureByID.mockResolvedValue(mockFixture);

      const result = await resolvers.Bet.fixture({ fixture_id: "fixture1" });

      expect(getIndividualFixtureByID).toHaveBeenCalledWith("fixture1");
      expect(result).toEqual({ fixture_type: "individual", ...mockFixture });
    });

    it("should return a participant fixture by fixture ID if individual fixture is not found", async () => {
      const mockFixture = { id: "fixture1", type: "participant" };
      getIndividualFixtureByID.mockResolvedValue(null);
      getParticipantFixtureByID.mockResolvedValue(mockFixture);

      const result = await resolvers.Bet.fixture({ fixture_id: "fixture1" });

      expect(getIndividualFixtureByID).toHaveBeenCalledWith("fixture1");
      expect(getParticipantFixtureByID).toHaveBeenCalledWith("fixture1");
      expect(result).toEqual({ fixture_type: "participant", ...mockFixture });
    });
  });
});
