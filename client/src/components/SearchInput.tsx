import { FC } from "react";
import { styled, alpha, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "&:focus-within": {
    transition: "transform 0.2s ease-in-out",
    transform: "scale(1.2)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const SearchInput: FC<{
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box display={"flex"} justifyContent="center" textAlign={"center"} mb={4}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Search>
    </Box>
  );
};

export default SearchInput;
