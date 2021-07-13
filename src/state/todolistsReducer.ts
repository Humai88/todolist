import { TodoListType, FilterValuesType } from "./../App";
import { v1 } from "uuid";

export const todolistsReducer = (
  state: TodoListType[],
  action: ActionTodolistsTypes
): TodoListType[] => {
  switch (action.type) {
    case "CHANGE_FILTER":
      let todoList = state.find((tl) => tl.id === action.todoListId);
      if (todoList) {
        todoList.filter = action.value;
        return [...state];
      }
      return state;
    case "REMOVE_TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD_TODOLIST":
      return [
        ...state,
        {
          id: v1(),
          filter: "All",
          title: action.title,
        },
      ];
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, title: action.title } : tl
      );

    default:
      throw new Error("I dont understand this action type");
  }
};

export type ActionTodolistsTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeTitleAC>;

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD_TODOLIST",
    title: title,
  } as const;
};
export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE_TODOLIST",
    id: id,
  } as const;
};
export const changeFilterAC = (value: FilterValuesType, todoListId: string) => {
  return {
    type: "CHANGE_FILTER",
    value: value,
    todoListId: todoListId,
  } as const;
};
export const changeTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    todoListId: todoListId,
    title: title,
  } as const;
};
