import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function notNullOrThrow<T>(value: T | null): T {
  if (value === null) {
    throw new Error("Value is null.");
  }

  return value;
}
