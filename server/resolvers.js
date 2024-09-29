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
  updateIndividualResolvedByFixtureId,
} from "./db/individual_fixtures.js";
import {
  getParticipantFixtureByID,
  getParticipantFixtures,
  updateParticipantResolvedByFixtureId,
} from "./db/participant_fixtures.js";
import {
  getModelSelectionByID,
  getModelSelections,
  getModelSelectionsByFixtureID,
  getModelSelectionsCountByFixtureID,
} from "./db/modelSelections.js";
import {
  getModelSelectionsOutcome,
  insertModelSelectionOutcome,
} from "./db/modelSelectionsOutcomes.js";
import { getFixtures } from "./db/fixtures.js";

export const resolvers = {
  Query: {
    fixtures: async () => {
      const fixtures = await getFixtures({
        sortBy: "event_start_time",
        sortByDirection: "asc",
      });

      return fixtures.map(async (fixture) => {
        if (fixture.fixture_type === "individual") {
          const fixtureDetails = await getIndividualFixtureByID(
            fixture.fixture_id
          );
          return { ...fixture, fixture_details: fixtureDetails };
        }
        if (fixture.fixture_type === "participant") {
          const fixtureDetails = await getParticipantFixtureByID(
            fixture.fixture_id
          );
          return { ...fixture, fixture_details: fixtureDetails };
        }
      });
    },
    bets: async (_, { fixture_id, selection_id }) => {
      return await getBetsPlaced(fixture_id, selection_id);
    },
    traders: async (_, { searchQuery }) => {
      return await getTraders({ searchQuery });
    },
    modelSelections: async (_, { fixture_id }) => {
      if (fixture_id) {
        return await getModelSelectionsByFixtureID(fixture_id);
      }
      return await getModelSelections();
    },
    modelSelection: async (_, { id }) => {
      return await getModelSelectionByID(id);
    },
    individualFixtures: async (_, { searchQuery, resolved }) => {
      return await getIndividualFixtures({
        sortBy: "event_start_time",
        resolved,
        searchQuery,
      });
    },
    participantFixtures: async (_, { searchQuery, resolved }) => {
      return await getParticipantFixtures({
        sortBy: "event_start_time",
        resolved,
        searchQuery,
      });
    },
  },

  Mutation: {
    resolveBet: async (
      _,
      { selection_id, fixture_id, fixture_type, outcome }
    ) => {
      const updatedRow = await insertModelSelectionOutcome({
        selection_id,
        outcome,
        fixture_id,
      });

      const totalOfFixtures = await getModelSelectionsCountByFixtureID(
        fixture_id
      );

      if (updatedRow.amountOfResolvedPerFixture === totalOfFixtures) {
        if (fixture_type === "participant") {
          await updateParticipantResolvedByFixtureId(fixture_id, true);
        } else if (fixture_type === "individual") {
          await updateIndividualResolvedByFixtureId(fixture_id, true);
        }
      }
      return updatedRow;
    },
  },

  Trader: {
    bets: async ({ trader_id }) => {
      const allBetsForTrader = await getBetsByTraderId(trader_id);
      const total_amount = allBetsForTrader.reduce(
        (acc, cur) => acc + cur.stake_size * cur.price,
        0
      );
      return {
        bets_placed: allBetsForTrader,
        total_amount: Number(total_amount).toFixed(2),
      };
    },
  },

  Bet: {
    trader: async ({ trader_id }) => await getTraderByID(trader_id),
    market: async ({ market_id }) => await getMarketByID(market_id),
    fixture: async ({ fixture_id }) => await getFixture(fixture_id),
    selection_model: async ({ selection_id }) =>
      await getModelSelectionByID(selection_id),
  },

  ModelSelection: {
    market: async ({ market_id }) => await getMarketByID(market_id),
    fixture: async ({ fixture_id }) => await getFixture(fixture_id),
    bets_placed: async ({ selection_id }) =>
      await getBetsPlacedByModelSelection(selection_id),
    outcome: async ({ selection_id }) =>
      await getModelSelectionsOutcome(selection_id),
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
