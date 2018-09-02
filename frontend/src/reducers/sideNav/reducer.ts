import { TOGGLE_COLLAPSED_NAV } from "./types";

export interface ISideNavState {
  navCollapsed: boolean;
}

const initialState: ISideNavState = { navCollapsed: false };

export function sideNavReducer(state = initialState, action: any) {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed
      };

    default:
      return state;
  }
}
