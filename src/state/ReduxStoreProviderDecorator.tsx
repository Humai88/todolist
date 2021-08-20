import { Provider } from "react-redux";
import { AppRootStateType } from "./store";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReducer";
import { TaskPriorities, TaskStatuses } from "../api/todolistsAPI";
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
const initialGlobalState = {
  todolists: [
    {
      id: "todoListId2",
      addedDate: "",
      order: 2,
      title: "TypeScript",
      filter: "All",
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "Book",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: "todolistId1",
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Book",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: "todolistId2",
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
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
