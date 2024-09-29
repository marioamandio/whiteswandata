import { Box } from "@mui/material";
import {
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  useState,
} from "react";
import SearchInput from "./SearchInput";

interface ChildProps {
  searchQuery: string;
  resolved?: boolean;
}

const CustomTabPanel: FC<{
  children: ReactElement<ChildProps>;
  value: number;
  index: number;
}> = ({ children, value, index }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "85vw" }}>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {isValidElement(children) &&
            cloneElement(children as ReactElement<ChildProps>, { searchQuery })}
        </Box>
      )}
    </div>
  );
};

export default CustomTabPanel;
