import { TaskStateType } from "./../App";
import { v1 } from "uuid";
import {
  ActionTodolistsTypes,
  SetTodosType,
  // todoListId_1,
  // todoListId_2,
} from "./todolistsReducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskType,
} from "../api/todolistsAPI";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

const initialState: TaskStateType = {
  // [todoListId_1]: [
  //   {
  //     id: v1(),
  //     title: "Apple",
  //     status: TaskStatuses.Completed,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_1,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "Rice",
  //     status: TaskStatuses.New,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_1,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "Milk",
  //     status: TaskStatuses.Completed,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_1,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "Pears",
  //     status: TaskStatuses.New,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_1,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  // ],
  // [todoListId_2]: [
  //   {
  //     id: v1(),
  //     title: "Book",
  //     status: TaskStatuses.Completed,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_2,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "News",
  //     status: TaskStatuses.New,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_2,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "Newspaper",
  //     status: TaskStatuses.Completed,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_2,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  //   {
  //     id: v1(),
  //     title: "Tutorials",
  //     status: TaskStatuses.New,
  //     priority: TaskPriorities.Middle,
  //     description: "Description",
  //     todoListId: todoListId_2,
  //     deadline: "",
  //     order: 1,
  //     addedDate: "",
  //     startDate: "",
  //   },
  // ],
};

export const tasksReducer = (
  state = initialState,
  action: ActionTasksTypes
): TaskStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }

    case "SET_TODOLISTS": {
      let stateCopy = { ...state };
      action.payload.todos.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }

    case "ADD_TASK":
      const stateCopy = { ...state };
      const newTask = action.payload.task;
      const tasks = stateCopy[newTask.todoListId];
      const newTasks = [newTask, ...tasks];
      stateCopy[newTask.todoListId] = newTasks;
      return stateCopy;

    case "REMOVE_TASK":
      state[action.payload.todoListId] = state[
        action.payload.todoListId
      ].filter((t) => t.id !== action.payload.taskId);
      return { ...state };

    case "UPDATE_TASK":
      state[action.payload.todolistId] = state[
        action.payload.todolistId
      ].map((t) =>
        t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t
      );
      return { ...state };

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

export type ActionTasksTypes =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ActionTodolistsTypes
  | SetTodosType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>;

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
export const fetchTasksThunk = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      const action = setTasksAC(tasks, todolistId);
      dispatch(action);
    });
  };
};

export const removeTaskThunk = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = removeTaskAC(taskId, todolistId);
      dispatch(action);
    });
  };
};

export const addTaskThunk = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.postTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      const action = addTaskAC(task);
      dispatch(action);
    });
  };
};

type UpdateTaskModelType = {
  description?: string;
  title?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export const updateTaskThunk = (
  taskId: string,
  model: UpdateTaskModelType,
  todolistId: string
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });
    if (!task) {
      console.log("No data");
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
      const action = updateTaskAC(taskId, model, todolistId);
      dispatch(action);
    });
  };
};
