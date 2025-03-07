import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pascalCaseToSentence(pascalString: string): string {
  // Split the PascalCase string into words and handle special transformations
  const words = pascalString
    .replace(/([A-Z][a-z]+)/g, " $1")
    .trim()
    .split(" ");
  const transformedWords = words.map((word) => {
    // Specific case transformations can be added here
    if (word === "Date") return "data";
    return word.toLowerCase();
  });

  // Join the words into a sentence
  return transformedWords.join(" ");
}
