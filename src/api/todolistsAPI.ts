import axios from "axios";
import { NamedTupleMember } from "typescript";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "api-key": "b108fd33-d977-4add-bda9-9da2037bdf7a",
  },
});
type TodolistType = {
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

export const todolistsAPI = {
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

  getTasks(todolistId: string) {
    return instance.get("todo-lists/" + todolistId + "/tasks");
  },
  postTask(todolistId: string, title: string) {
    return instance.post("todo-lists/" + todolistId + "/tasks", {
      title: title,
    });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete("todo-lists/" + todolistId + "/tasks/" + taskId);
  },
  updateTask(
    todolistId: string,
    taskId: string,
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
  ) {
    return instance.put<ResponseType>(
      "todo-lists/" + todolistId + "/tasks/" + taskId,
      {
        title,
        description,
        completed,
        status,
        priority,
        startDate,
        deadline,
      }
    );
  },
};
