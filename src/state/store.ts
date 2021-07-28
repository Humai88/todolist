import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
