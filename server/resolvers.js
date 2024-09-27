import {
  getBetsPlaced,
  getBetsPlacedByModelSelection,
  getBetsByTraderId,
} from "./db/betsPlaced.js";
import { getTraderByID, getTraders } from "./db/traders.js";
import { getMarketByID } from "./db/markets.js";
import {
  getIndividualFixtures,
  getIndividualFixtureByID,
} from "./db/individual_fixtures.js";
import {
  getParticipantFixtureByID,
  getParticipantFixtures,
} from "./db/participant_fixtures.js";
import {
  getModelSelectionByID,
  getModelSelections,
  getModelSelectionsByFixtureID,
} from "./db/modelSelections.js";
import { getModelSelectionsOutcome } from "./db/modelSelectionsOutcomes.js";

export const resolvers = {
  Query: {
    bets: async (_, { fixture_id, selection_id }) => {
      const betsPlaced = await getBetsPlaced(fixture_id, selection_id);
      return betsPlaced;
    },
    traders: async () => {
      return await getTraders();
    },
    modelSelections: async (_, args) => {
      if (args.fixture_id) {
        return await getModelSelectionsByFixtureID(args.fixture_id);
      }

      return await getModelSelections();
    },

    modelSelection: async (_, { id }) => {
      const modelSelection = await getModelSelectionByID(id);
      return modelSelection;
    },

    individualFixtures: async () => {
      return await getIndividualFixtures();
    },
    participantFixtures: async () => {
      return await getParticipantFixtures();
    },
  },
  Trader: {
    bets: async ({ trader_id }) => {
      const allBetsForTrader = await getBetsByTraderId(trader_id);

      const total_amount = allBetsForTrader.reduce((acc, cur) => {
        return acc + cur.stake_size * cur.price;
      }, 0);

      return {
        bets_placed: allBetsForTrader,
        total_amount: Number(total_amount).toFixed(2),
      };
    },
  },

  Bet: {
    trader: async ({ trader_id }) => {
      const trader = await getTraderByID(trader_id);
      return await trader;
    },
    market: async ({ market_id }) => {
      return await getMarket(market_id);
    },
    fixture: async ({ fixture_id }) => {
      return await getFixture(fixture_id);
    },
    selection_model: async ({ selection_id }) => {
      return await getModelSelectionByID(selection_id);
    },
  },

  ModelSelection: {
    market: async ({ market_id }) => {
      return await getMarket(market_id);
    },
    fixture: async ({ fixture_id }) => {
      return await getFixture(fixture_id);
    },
    bets_placed: async ({ selection_id }) => {
      const betsPlaced = await getBetsPlacedByModelSelection(selection_id);

      return betsPlaced;
    },
    outcome: async ({ selection_id }) => {
      const outcome = await getModelSelectionsOutcome(selection_id);
      return await outcome;
    },
  },
};

const getMarket = async (market_id) => {
  return await getMarketByID(market_id);
};

const getFixture = async (fixture_id) => {
  const individualFixture = await getIndividualFixtureByID(fixture_id);
  if (individualFixture) {
    return { fixture_type: "individual", ...individualFixture };
  }
  const participantFixture = await getParticipantFixtureByID(fixture_id);

  return { fixture_type: "participant", ...participantFixture };
};
