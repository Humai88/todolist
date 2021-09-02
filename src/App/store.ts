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

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
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
export type AppActionsType = ActionTasksTypes | ActionTodolistsTypes;
// @ts-ignore
window.store = store;
