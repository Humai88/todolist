import { TaskStateType } from "./../App";
import { v1 } from "uuid";
import {
  ActionTodolistsTypes,
  todoListId_1,
  todoListId_2,
} from "./todolistsReducer";
import { TaskPriorities, TaskStatuses } from "../api/todolistsAPI";

const initialState: TaskStateType = {
  [todoListId_1]: [
    {
      id: v1(),
      title: "Apple",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_1,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "Rice",
      status: TaskStatuses.New,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_1,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "Milk",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_1,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "Pears",
      status: TaskStatuses.New,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_1,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
  ],
  [todoListId_2]: [
    {
      id: v1(),
      title: "Book",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_2,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "News",
      status: TaskStatuses.New,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_2,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "Newspaper",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_2,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
    {
      id: v1(),
      title: "Tutorials",
      status: TaskStatuses.New,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_2,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    },
  ],
};

export const tasksReducer = (
  state = initialState,
  action: ActionTasksTypes
): TaskStateType => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: v1(),
        title: action.payload.title,
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: action.payload.todoListId,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      };
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
      state[action.payload.todoListId] = state[
        action.payload.todoListId
      ].map((t) =>
        t.id === action.payload.taskId
          ? { ...t, status: action.payload.status }
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
  status: TaskStatuses,
  todoListId: string
) => {
  return {
    type: "STATUS_CHANGE",
    payload: {
      todoListId: todoListId,
      taskId: taskId,
      status: status,
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
