import IndividualFixturesCard from "../components/fixures/IndividualFixtureCard";
import { render, screen } from "@testing-library/react";

test("renders IndicidualFixtureCard", () => {
  render(
    <IndividualFixturesCard
      event_name={"test"}
      event_number={5}
      event_start_time={"2023-05-28T13:00:00Z"}
      runner={"runner"}
      sport_id={"test"}
    />
  );
  const headingElement = screen.getByText("test");
  const dateElement = screen.getByText((content) => {
    return content.includes("28 May 2023 at 2:00:00 pm");
  });
  expect(headingElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
});
