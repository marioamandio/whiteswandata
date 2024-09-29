import { connection } from "./connection.js";

async function deleteAllData() {
  try {
    const deletedRows = await connection("model_selections_resolutions").del();
  } catch (error) {
    console.error("Error deleting data:", error.message);
  }
}

const individualFixtureUpdates = [
  { fixture_id: "2836661", resolved: 0 },
  { fixture_id: "7608816", resolved: 0 },
  { fixture_id: "2917103", resolved: 0 },
  { fixture_id: "8876473", resolved: 0 },
  { fixture_id: "2453535", resolved: 0 },
  { fixture_id: "3163925", resolved: 1 },
  { fixture_id: "8585251", resolved: 1 },
  { fixture_id: "2718302", resolved: 0 },
  { fixture_id: "7717606", resolved: 0 },
  { fixture_id: "2467196", resolved: 0 },
  { fixture_id: "6497446", resolved: 0 },
  { fixture_id: "4268488", resolved: 0 },
  { fixture_id: "5673402", resolved: 1 },
  { fixture_id: "7124034", resolved: 0 },
  { fixture_id: "6815608", resolved: 0 },
  { fixture_id: "7888437", resolved: 0 },
  { fixture_id: "1232166", resolved: 0 },
  { fixture_id: "2319908", resolved: 0 },
];

async function updateIndividualFixtures() {
  try {
    for (const { fixture_id, resolved } of individualFixtureUpdates) {
      await connection("individual_fixtures")
        .where({ fixture_id })
        .update({ resolved });
    }
  } catch (error) {
    console.error("Error updating fixture:", error.message);
  }
}

async function updateAllParticipantFixturesRowsResolvedToFalse() {
  try {
    await connection("participant_fixtures").update({
      resolved: 0,
    });
  } catch (error) {
    console.error("Error updating rows:", error.message);
  }
}

const fixturesTableDefaultValues = [
  {
    fixture_id: "2836661",
    event_start_time: "2023-05-28T13:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "7608816",
    event_start_time: "2023-05-28T14:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "2917103",
    event_start_time: "2023-05-28T15:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "8876473",
    event_start_time: "2023-05-28T16:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "2453535",
    event_start_time: "2023-05-28T04:40:00Z",
    sport_id: 13,
    resolved: 1,
    fixture_type: "individual",
  },
  {
    fixture_id: "3163925",
    event_start_time: "2023-05-28T05:00:00Z",
    sport_id: 14,
    resolved: 1,
    fixture_type: "individual",
  },
  {
    fixture_id: "8585251",
    event_start_time: "2023-05-28T19:30:00Z",
    sport_id: 13,
    resolved: 1,
    fixture_type: "individual",
  },
  {
    fixture_id: "2718302",
    event_start_time: "2023-05-28T11:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "7717606",
    event_start_time: "2023-05-28T12:00:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "2467196",
    event_start_time: "2023-05-28T13:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "6497446",
    event_start_time: "2023-05-28T14:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "4268488",
    event_start_time: "2023-05-28T15:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "5673402",
    event_start_time: "2023-05-28T10:00:00Z",
    sport_id: 12,
    resolved: 1,
    fixture_type: "individual",
  },
  {
    fixture_id: "7124034",
    event_start_time: "2023-05-28T11:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "6815608",
    event_start_time: "2023-05-28T12:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "7888437",
    event_start_time: "2023-05-28T13:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "1232166",
    event_start_time: "2023-05-28T14:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "2319908",
    event_start_time: "2023-05-28T15:30:00Z",
    sport_id: 12,
    resolved: 0,
    fixture_type: "individual",
  },
  {
    fixture_id: "4436505",
    event_start_time: "2023-05-28T12:00:00Z",
    sport_id: 10004,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "5972107",
    event_start_time: "2023-06-28T15:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "6118900",
    event_start_time: "2023-05-28T16:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "2820385",
    event_start_time: "2023-05-28T18:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "1714646",
    event_start_time: "2023-05-28T20:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "1024457",
    event_start_time: "2023-05-26T14:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "5555617",
    event_start_time: "2023-05-26T12:00:00Z",
    sport_id: 10004,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "7207152",
    event_start_time: "2023-05-28T14:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "3642596",
    event_start_time: "2023-05-26T12:00:00Z",
    sport_id: 10004,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "8287123",
    event_start_time: "2023-05-28T15:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "2005981",
    event_start_time: "2023-05-27T14:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "2663119",
    event_start_time: "2023-05-27T12:00:00Z",
    sport_id: 10004,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "4650557",
    event_start_time: "2023-05-27T15:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "4180904",
    event_start_time: "2023-05-27T12:00:00Z",
    sport_id: 10004,
    resolved: 0,
    fixture_type: "participant",
  },
  {
    fixture_id: "4754159",
    event_start_time: "2023-05-26T14:00:00Z",
    sport_id: 10001,
    resolved: 0,
    fixture_type: "participant",
  },
];

async function updateFixturesTable() {
  try {
    for (const {
      fixture_id,
      event_start_time,
      sport_id,
      resolved,
      fixture_type,
    } of fixturesTableDefaultValues) {
      await connection("fixtures")
        .insert({
          fixture_id,
          event_start_time,
          sport_id,
          resolved,
          fixture_type,
        })
        .onConflict("fixture_id")
        .merge();
    }
  } catch (error) {
    console.error("Error updating fixture:", error.message);
  }
}

const runOperations = async () => {
  try {
    await deleteAllData();
    await updateIndividualFixtures();
    await updateAllParticipantFixturesRowsResolvedToFalse();
    await updateFixturesTable();
  } catch (error) {
    console.error("Error running operations:", error.message);
  } finally {
    await connection.destroy();
    console.log("Database connection closed.");
  }
};

runOperations();
