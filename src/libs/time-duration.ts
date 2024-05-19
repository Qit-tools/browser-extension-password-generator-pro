import type { DurationObjectUnits, DurationUnits } from "luxon";
import { Duration } from "luxon";

export const durationUnits: DurationUnits = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
];

export function timeDurationToUnits(
  durationObject: DurationObjectUnits,
): string[] {
  const nonZeroUnits = Object.entries(durationObject).filter(
    ([, value]) => value !== 0,
  );
  if (nonZeroUnits.length === 0) {
    return [];
  }

  const formattedUnits = nonZeroUnits.map(
    ([unit, value]) => `${value} ${unit}`,
  );

  return formattedUnits;
}

interface HumanReadableOptions {
  units?: DurationUnits;
  first?: boolean;
}

export function secondsToHumanReadable(
  seconds: number,
  locale: string,
  defaultOptions?: HumanReadableOptions,
): string {
  const options = { units: durationUnits, first: false, ...defaultOptions };

  if (seconds > 3155760000) {
    return "∞";
  }

  const years = Math.floor(seconds / (3600 * 24 * 365));
  seconds -= years * 3600 * 24 * 365;
  const months = Math.floor(seconds / (3600 * 24 * 30));
  seconds -= months * 3600 * 24 * 30;
  const weeks = Math.floor(seconds / (3600 * 24 * 7));
  seconds -= weeks * 3600 * 24 * 7;
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  const durationValues = {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };

  const duration = {} as DurationObjectUnits;
  let firstUnitAdded = false;

  for (const unit of options.units) {
    if (durationValues[unit as keyof typeof durationValues] > 0) {
      if (options.first && firstUnitAdded) break;
      duration[unit as keyof typeof durationValues] =
        durationValues[unit as keyof typeof durationValues];
      firstUnitAdded = true;
    }
  }

  const formattedDuration = Duration.fromObject(duration, { locale }).toHuman({
    unitDisplay: "long",
    listStyle: "long",
  });

  return formattedDuration;
}
