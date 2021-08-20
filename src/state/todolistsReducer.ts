import { TodolistType } from "./../api/todolistsAPI";
import { v1 } from "uuid";

export type TodoListEntityType = TodolistType & {
  filter: FilterValuesType;
};
export const todoListId_1 = v1();
export const todoListId_2 = v1();
export type FilterValuesType = "All" | "Completed" | "Active";

const initialState: TodoListEntityType[] = [
  { id: todoListId_1, addedDate: "", order: 1, title: "React", filter: "All" },
  {
    id: todoListId_2,
    addedDate: "",
    order: 2,
    title: "TypeScript",
    filter: "All",
  },
];

export const todolistsReducer = (
  state = initialState,
  action: ActionTodolistsTypes
): TodoListEntityType[] => {
  switch (action.type) {
    case "CHANGE_FILTER":
      debugger;
      let todoList = state.find((tl) => tl.id === action.payload.todoListId);
      if (todoList) {
        todoList.filter = action.payload.value;
        return [...state];
      }
      return state;
    case "REMOVE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todoListId);
    case "ADD_TODOLIST":
      return [
        {
          id: action.payload.todolistId,
          filter: "All",
          title: action.payload.title,
          addedDate: "",
          order: 0,
        },
        ...state,
      ];
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, title: action.payload.title }
          : tl
      );

    default:
      return state;
  }
};

export type ActionTodolistsTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>;

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD_TODOLIST",
    payload: {
      title: title,
      todolistId: v1(),
    },
  } as const;
};
export const removeTodolistAC = (todoListId: string) => {
  return {
    type: "REMOVE_TODOLIST",
    payload: {
      todoListId: todoListId,
    },
  } as const;
};
export const changeFilterAC = (value: FilterValuesType, todoListId: string) => {
  return {
    type: "CHANGE_FILTER",
    payload: {
      value: value,
      todoListId: todoListId,
    },
  } as const;
};
export const changeTodolistTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload: {
      todoListId: todoListId,
      title: title,
    },
  } as const;
};
