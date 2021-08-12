import { Provider } from "react-redux";
import { AppRootStateType } from "./store";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReducer";
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>;
};
