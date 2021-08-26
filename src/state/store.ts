import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
