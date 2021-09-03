import { ActionTodolistsTypes, SetTodosType } from "./todolistsReducer";
import { TaskStateType } from "./TodolistsList ";
import { TaskType, todolistsAPI, UpdateTaskType } from "../../api/todolistsAPI";
import { AppRootStateType, ThunkType } from "../../App/store";
import { setAppErrorAC, setAppStatusAC } from "../../App/appReducer";

const initialState: TaskStateType = {};

export const tasksReducer = (
  state = initialState,
  action: ActionTasksTypes
): TaskStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks,
      };
    }
    case "SET_TODOLISTS": {
      let stateCopy = { ...state };
      action.payload.todos.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "ADD_TASK":
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      };
    case "REMOVE_TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t
        ),
      };

    case "ADD_TODOLIST":
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };
    case "REMOVE_TODOLIST":
      const copy = { ...state };
      delete copy[action.payload.todoListId];
      return copy;
    default:
      return state;
  }
};

// Action creators
export const addTaskAC = (task: TaskType) => {
  return {
    type: "ADD_TASK",
    payload: {
      task,
    },
  } as const;
};
export const removeTaskAC = (taskId: string, todoListId: string) => {
  return {
    type: "REMOVE_TASK",
    payload: {
      todoListId,
      taskId,
    },
  } as const;
};
export const updateTaskAC = (
  taskId: string,
  model: UpdateTaskModelType,
  todolistId: string
) => {
  return {
    type: "UPDATE_TASK",
    payload: {
      todolistId,
      taskId,
      model,
    },
  } as const;
};
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
  return {
    type: "SET_TASKS",
    payload: {
      tasks,
      todolistId,
    },
  } as const;
};

// Thunks
export const fetchTasksThunk = (todolistId: string): ThunkType => (
  dispatch
) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI.getTasks(todolistId).then((res) => {
    dispatch(setAppStatusAC("succeeded"));
    const tasks = res.data.items;
    dispatch(setTasksAC(tasks, todolistId));
  });
};

export const removeTaskThunk = (
  taskId: string,
  todolistId: string
): ThunkType => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
    dispatch(setAppStatusAC("succeeded"));
    dispatch(removeTaskAC(taskId, todolistId));
  });
};

export const addTaskThunk = (todolistId: string, title: string): ThunkType => (
  dispatch
) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI.postTask(todolistId, title).then((res) => {
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(addTaskAC(task));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      if (res.data.messages.length) {
        dispatch(setAppErrorAC(res.data.messages[0]));
      } else {
        dispatch(setAppErrorAC("Some error occurred"));
      }
      dispatch(setAppStatusAC("failed"));
    }
  });
};

export const updateTaskThunk = (
  taskId: string,
  model: UpdateTaskModelType,
  todolistId: string
): ThunkType => (dispatch, getState: () => AppRootStateType) => {
  const allTasksFromState = getState().tasks;
  const tasksForCurrentTodolist = allTasksFromState[todolistId];
  const task = tasksForCurrentTodolist.find((t) => {
    return t.id === taskId;
  });
  if (!task) {
    return;
  }
  const apiModel: UpdateTaskType = {
    title: task.title,
    startDate: task.startDate,
    priority: task.priority,
    description: task.description,
    deadline: task.deadline,
    status: task.status,
    ...model,
  };
  todolistsAPI.updateTask(todolistId, taskId, apiModel).then(() => {
    dispatch(updateTaskAC(taskId, model, todolistId));
  });
};

// Types
export type ActionTasksTypes =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ActionTodolistsTypes
  | SetTodosType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>;

type UpdateTaskModelType = {
  description?: string;
  title?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
