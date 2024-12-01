import { Strain } from "./graphql/appsync";

export const allDirections = ["N", "W", "E", "S"] as const;
export const englishNameOfDirection = (
  direction: (typeof allDirections)[number],
) => {
  switch (direction) {
    case "N":
      return "North";
    case "W":
      return "West";
    case "E":
      return "East";
    case "S":
      return "South";
    default:
      return "Unknown";
  }
};
export const englishNameOfStrain = (strain: Strain) => {
  switch (strain) {
    case "C":
      return "Clubs";
    case "D":
      return "Diamonds";
    case "H":
      return "Hearts";
    case "S":
      return "Spades";
    case "NT":
      return "No Trump";
    default:
      return "Unknown";
  }
};
