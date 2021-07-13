import { TaskStateType } from "./../App";
import { v1 } from "uuid";

export const tasksReducer = (
  state: TaskStateType,
  action: ActionTasksTypes
): TaskStateType => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = { id: v1(), title: action.title, isDone: false };
      state[action.todoListId] = [newTask, ...state[action.todoListId]];
      return { ...state };
    case "REMOVE_TASK":
      return state;
    case "STATUS_CHANGE":
      return state;
    case "CHANGE_TASK_TITLE":
      return state;

    default:
      throw new Error("I dont understand this action type");
  }
};

export type ActionTasksTypes =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof statusChangeAC>
  | ReturnType<typeof changeTaskTitleAC>;

export const addTaskAC = (title: string, todoListId: number) => {
  return {
    type: "ADD_TASK",
    title: title,
    todoListId: todoListId,
  } as const;
};
export const removeTaskAC = (id: string) => {
  return {
    type: "REMOVE_TASK",
    id: id,
  } as const;
};
export const statusChangeAC = (todoListId: string) => {
  return {
    type: "STATUS_CHANGE",

    todoListId: todoListId,
  } as const;
};
export const changeTaskTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE_TASK_TITLE",
    todoListId: todoListId,
    title: title,
  } as const;
};
