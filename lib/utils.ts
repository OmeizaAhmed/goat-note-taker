import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleError(error: unknown){
  if (error instanceof Error) {
    console.error(error.message);
    return {error: error.message};
  } else {
    console.error("An unknown error occurred");
    return {error: "An unknown error occurred"};
  }
}