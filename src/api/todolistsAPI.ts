import axios from "axios";
import { RequestStatusType } from "../App/appReducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "api-key": "f55312fa-da02-4f9d-ab69-743608146acf",
  },
});

//api
export const todolistsAPI = {
  //T-dlist api
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  postTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
  },
  //Tasks api
  getTasks(todolistId: string) {
    return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  postTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title,
      }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
  authMe() {
    return instance.get<ResponseType<LoginParamsType>>(`auth/me`);
  },
};

// Types
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  entityStatus: RequestStatusType;
};
export type UpdateTaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
type TaskResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
