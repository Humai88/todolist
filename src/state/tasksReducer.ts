import { TaskStateType } from "./../App";
import { v1 } from "uuid";

export const tasksReducer = (
  state: TaskStateType,
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
    payload: {
      title: title,
      todoListId: todoListId,
    },
  } as const;
};

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "REMOVE_TASK",
    payload: {
      todoListId: todoListId,
      taskId: taskId,
    },
  } as const;
};

export const statusChangeAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
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
  todoListId: string,
  taskId: string,
  title: string
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
