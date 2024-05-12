import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const runAsyncFnWithoutBlocking = (fn: (...args: any) => Promise<any>) => {
  fn();
} 

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));