import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const shouldAnimate = () => {
  return !getIsMobile() && !prefersReducedMotion();
};
