import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "api-key": "b108fd33-d977-4add-bda9-9da2037bdf7a",
  },
});
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type ResponseType<D = {}> = {
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

export const todolistsAPI = {
  //TDlist
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  postTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
      title: title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    });
  },
  //Tasks
  getTasks(todolistId: string) {
    return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  postTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: title,
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
