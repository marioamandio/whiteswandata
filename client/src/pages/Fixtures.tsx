import { Box, Tab, Tabs, Typography } from "@mui/material";
import IndividualFixtures from "../components/fixtures/IndividualFixtures";
import ParticipantFixtures from "../components/fixtures/ParticipantFixtures";
import { useState } from "react";
import TradersTable from "../components/TradersTable";
import CustomTabPanel from "../components/CustomTabPanel";

const TABS_LABELS = [
  "All Individual Fixtures",
  "All Participant Fixtures",
  "Unresolved Individual Fixtures",
  "Unresolved Participant Fixtures",
  "Traders",
];

const FixturesPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Box>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        {TABS_LABELS.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <Typography variant="h3" sx={{ marginBottom: "8px" }}>
        {TABS_LABELS[tabIndex]}
      </Typography>

      <CustomTabPanel value={tabIndex} index={0}>
        <IndividualFixtures searchQuery={""} />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <ParticipantFixtures searchQuery={""} />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <IndividualFixtures resolved={false} searchQuery={""} />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={3}>
        <ParticipantFixtures resolved={false} searchQuery={""} />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={4}>
        <TradersTable searchQuery={""} />
      </CustomTabPanel>
    </Box>
  );
};

export default FixturesPage;
