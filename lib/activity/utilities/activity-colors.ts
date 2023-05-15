const eventColors = {
  SUNSET: ["#EE7C2F", "#740D39"],
  MARS: ["#FEECA2", "#BBB47A", "#774412"],
  // ice: ["#01F5F2", "#9CF6E3", "#003654"],
};

export type ActivityColor = keyof typeof eventColors;

function getGradientColors(color: ActivityColor) {
  return eventColors[color];
}

function generateCSSGradient(colors: string[]) {
  return `linear-gradient(to bottom, ${colors.join(", ")})`;
}

export const getActivityGradient = (color: ActivityColor) =>
  generateCSSGradient(getGradientColors(color));

export function getActivityColors() {
  return Object.keys(eventColors) as ActivityColor[];
}
