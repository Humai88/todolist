import { TaskStateType } from "./../App";
import { v1 } from "uuid";
import { ActionTodolistsTypes } from "./todolistsReducer";

export const todoListId_1 = v1();
export const todoListId_2 = v1();

const initialState: TaskStateType = {
  [todoListId_1]: [
    { id: v1(), title: "Apple", isDone: true },
    { id: v1(), title: "Rice", isDone: false },
    { id: v1(), title: "Milk", isDone: true },
    { id: v1(), title: "Pears", isDone: true },
  ],
  [todoListId_2]: [
    { id: v1(), title: "Book", isDone: true },
    { id: v1(), title: "News", isDone: false },
    { id: v1(), title: "Newspaper", isDone: true },
    { id: v1(), title: "Tutorials", isDone: true },
  ],
};

export const tasksReducer = (
  state = initialState,
  action: ActionTasksTypes
): TaskStateType => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      state[action.payload.todoListId] = [
        newTask,
        ...state[action.payload.todoListId],
      ];
      return { ...state };

    case "REMOVE_TASK":
      state[action.payload.todoListId] = state[
        action.payload.todoListId
      ].filter((t) => t.id !== action.payload.taskId);
      return { ...state };

    case "STATUS_CHANGE":
      state[action.payload.todoListId] = state[action.payload.todoListId].map(
        (t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.isDone }
            : t
      );
      return { ...state };

    case "CHANGE_TASK_TITLE":
      state[action.payload.todoListId] = state[action.payload.todoListId].map(
        (t) => {
          if (t.id === action.payload.taskId) {
            return { ...t, title: action.payload.title };
          }
          return t;
        }
      );
      return { ...state };

    case "ADD_TODOLIST":
      return {
        ...state,
        [action.payload.todolistId]: [],
      };

    case "REMOVE_TODOLIST":
      const copy = { ...state };
      delete copy[action.payload.todoListId];
      return copy;

    default:
      return state;
  }
};

export type ActionTasksTypes =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof statusChangeAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ActionTodolistsTypes;

export const addTaskAC = (title: string, todoListId: string) => {
  return {
    type: "ADD_TASK",
    payload: {
      title: title,
      todoListId: todoListId,
    },
  } as const;
};

export const removeTaskAC = (taskId: string, todoListId: string) => {
  return {
    type: "REMOVE_TASK",
    payload: {
      todoListId: todoListId,
      taskId: taskId,
    },
  } as const;
};

export const statusChangeAC = (
  taskId: string,
  isDone: boolean,
  todoListId: string
) => {
  return {
    type: "STATUS_CHANGE",
    payload: {
      todoListId: todoListId,
      taskId: taskId,
      isDone: isDone,
    },
  } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todoListId: string
) => {
  return {
    type: "CHANGE_TASK_TITLE",
    payload: {
      todoListId: todoListId,
      title: title,
      taskId: taskId,
    },
  } as const;
};
