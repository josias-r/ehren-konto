const yearMS = 31556952000;
const monthMS = 2629746000;
const weekMS = 604800000;
const dayMS = 86400000;
const hourMS = 3600000;
const minuteMS = 60000;

type EventRelativeDateReturn = {
  formatted: string;
  range: "minutes" | "hours" | "days" | "weeks" | "months" | "years";
};

function activityRelativeDate(relativeDate: Date): EventRelativeDateReturn {
  const diffInMilliseconds = relativeDate.getTime() - Date.now();
  const absoluteDiffInMilliseconds = Math.abs(diffInMilliseconds);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absoluteDiffInMilliseconds < hourMS) {
    return {
      formatted: rtf.format(
        Math.round(diffInMilliseconds / minuteMS),
        "minutes"
      ),
      range: "minutes",
    };
  }
  if (absoluteDiffInMilliseconds < dayMS) {
    return {
      formatted: rtf.format(Math.round(diffInMilliseconds / hourMS), "hours"),
      range: "hours",
    };
  }
  if (absoluteDiffInMilliseconds < weekMS) {
    return {
      formatted: rtf.format(Math.round(diffInMilliseconds / dayMS), "days"),
      range: "days",
    };
  }
  if (absoluteDiffInMilliseconds < monthMS) {
    return {
      formatted: rtf.format(Math.round(diffInMilliseconds / weekMS), "weeks"),
      range: "weeks",
    };
  }
  if (absoluteDiffInMilliseconds < yearMS) {
    return {
      formatted: rtf.format(Math.round(diffInMilliseconds / monthMS), "months"),
      range: "months",
    };
  }
  return {
    formatted: rtf.format(Math.round(diffInMilliseconds / yearMS), "years"),
    range: "years",
  };
}

export default activityRelativeDate;
