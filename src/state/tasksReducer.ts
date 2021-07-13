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
      state[action.todoListId] = state[action.todoListId].filter(
        (t) => t.id !== action.taskId
      );
      return { ...state };

    case "STATUS_CHANGE":
      state[action.todoListId] = state[action.todoListId].map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );
      return { ...state };
    case "CHANGE_TASK_TITLE":
      state[action.todoListId] = state[action.todoListId].map((t) => {
        if (t.id === action.taskId) {
          return { ...t, title: action.title };
        }
        return t;
      });
      return { ...state };
    default:
      throw new Error("I dont understand this action type");
  }
};

export type ActionTasksTypes =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof statusChangeAC>
  | ReturnType<typeof changeTaskTitleAC>;

export const addTaskAC = (title: string, todoListId: string) => {
  return {
    type: "ADD_TASK",
    title: title,
    todoListId: todoListId,
  } as const;
};
export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "REMOVE_TASK",
    todoListId: todoListId,
    taskId: taskId,
  } as const;
};
export const statusChangeAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: "STATUS_CHANGE",
    todoListId: todoListId,
    taskId: taskId,
    isDone: isDone,
  } as const;
};
export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  title: string
) => {
  return {
    type: "CHANGE_TASK_TITLE",
    todoListId: todoListId,
    title: title,
    taskId: taskId,
  } as const;
};
