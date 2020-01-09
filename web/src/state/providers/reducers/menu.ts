import {
  MenuState,
  ActionType,
  ActionTypeInterface
} from "./../../models/index";
import { ActionTypes } from "../actions/types";

export default (state: MenuState, action: ActionType): MenuState => {
  switch (action.type) {
    case ActionTypes.UPDATE_CONTEXT_MENU:
      return {
        ...state,
        context: {
          ...state.context,
          component: action.payload
        }
      };
    case ActionTypes.UPDATE_MAIN_MENU:
      return {
        ...state,
        main: {
          component: action.payload
        }
      };
    default:
      return state;
  }
};
