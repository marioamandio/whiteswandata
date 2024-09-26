import { Box, Tab, Tabs } from "@mui/material";
import IndividualFixtures from "../components/fixures/IndividualFixtures";
import ParticipantFixtures from "../components/fixures/ParticipantFixtures";
import { FC, ReactNode, useState } from "react";

const CustomTabPanel: FC<{
  children: ReactNode;
  value: number;
  index: number;
}> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const FixturesPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label="Individual Fixtures" />
        <Tab label="Participant Fixtures" />
      </Tabs>

      <CustomTabPanel value={tabIndex} index={0}>
        <IndividualFixtures />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <ParticipantFixtures />
      </CustomTabPanel>
    </Box>
  );
};

export default FixturesPage;
