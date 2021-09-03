import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import {
  ActionTasksTypes,
  tasksReducer,
} from "../Features/Todolists/tasksReducer";
import {
  ActionTodolistsTypes,
  todolistsReducer,
} from "../Features/Todolists/todolistsReducer";
import { ActionAppTypes, appReducer } from "./appReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type ThunkType = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppActionsType
>;
// All action types
export type AppActionsType =
  | ActionTasksTypes
  | ActionTodolistsTypes
  | ActionAppTypes;
// @ts-ignore
window.store = store;
