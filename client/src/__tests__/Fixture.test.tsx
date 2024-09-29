import IndividualFixturesCard from "../components/fixtures/IndividualFixtureCard";
import { render, screen } from "@testing-library/react";

test("renders IndicidualFixtureCard", () => {
  render(
    <IndividualFixturesCard
      event_name={"test"}
      event_number={5}
      event_start_time={"2023-05-28T13:00:00Z"}
      runner={"runner"}
      sport_id={"test"}
      resolved={false}
    />
  );
  const headingElement = screen.getByText("test");
  const dateElement = screen.getByText((content) => {
    return content.includes("28 May 2023 at 14:00");
  });
  expect(headingElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
});
