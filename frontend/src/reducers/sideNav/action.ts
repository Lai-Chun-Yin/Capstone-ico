import { TOGGLE_COLLAPSED_NAV } from "./types";

export function toggleCollapsedNav(isNavCollapsed: boolean) {
  return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}
