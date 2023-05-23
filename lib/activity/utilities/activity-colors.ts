const eventColors = {
  SUNSET: ["#EE7C2F", "#740D39"],
  MARS: ["#AD4673", "#0F2C67"],
  EHRE: ["#77CFE2", "#2D0F35"],
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
