import { TodoListType, FilterValuesType } from "./../App";
import { v1 } from "uuid";

export const todolistsReducer = (
  state: TodoListType[],
  action: ActionTodolistsTypes
): TodoListType[] => {
  switch (action.type) {
    case "CHANGE_FILTER":
      let todoList = [...state].find(
        (tl) => tl.id === action.payload.todoListId
      );
      if (todoList) {
        todoList.filter = action.payload.value;
        return [...state];
      }
      return state;
    case "REMOVE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todoListId);
    case "ADD_TODOLIST":
      return [
        ...state,
        {
          id: action.payload.todolistId,
          filter: "All",
          title: action.payload.title,
        },
      ];
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, title: action.payload.title }
          : tl
      );

    default:
      throw new Error("I dont understand this action type");
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
