const eventColors = {
  SUNSET: ["#EE7C2F", "#740D39"],
  MARS: ["#FEECA2", "#BBB47A", "#774412"],
  // ice: ["#01F5F2", "#9CF6E3", "#003654"],
};

export type EventColor = keyof typeof eventColors;

function getColors(color: EventColor) {
  return eventColors[color];
}

function generateCSSGradient(colors: string[]) {
  return `linear-gradient(to bottom, ${colors.join(", ")})`;
}

export const getEventGradient = (color: EventColor) =>
  generateCSSGradient(getColors(color));
