import { todolistsAPI, TodolistType } from "./../../api/todolistsAPI";
import { v1 } from "uuid";
import { Dispatch } from "redux";
import { AppActionsType, ThunkType } from "../../App/store";

// For tests
export const todoListId_1 = v1();
export const todoListId_2 = v1();

const initialState: TodoListEntityType[] = [];

export const todolistsReducer = (
  state = initialState,
  action: ActionTodolistsTypes
): TodoListEntityType[] => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, filter: action.payload.value }
          : tl
      );
    case "REMOVE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todoListId);
    case "ADD_TODOLIST":
      return [
        {
          ...action.payload.todolist,
          filter: "All",
        },
        ...state,
      ];
    case "UPDATE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, title: action.payload.title }
          : tl
      );
    case "SET_TODOLISTS":
      return action.payload.todos.map((tl) => {
        return { ...tl, filter: "All" };
      });
    default:
      return state;
  }
};

// Action creators
export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD_TODOLIST",
    payload: {
      todolist,
    },
  } as const;
};
export const removeTodolistAC = (todoListId: string) => {
  return {
    type: "REMOVE_TODOLIST",
    payload: {
      todoListId,
    },
  } as const;
};
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: "CHANGE_FILTER",
    payload: {
      value,
      todolistId,
    },
  } as const;
};
export const updateTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "UPDATE_TODOLIST_TITLE",
    payload: {
      todolistId,
      title,
    },
  } as const;
};
export const setTodolistsAC = (todos: TodolistType[]) => {
  return {
    type: "SET_TODOLISTS",
    payload: {
      todos,
    },
  } as const;
};

// Thunks
export const fetchTodolistsThunk = (dispatch: Dispatch<AppActionsType>) => {
  todolistsAPI.getTodolists().then((res) => {
    const action = setTodolistsAC(res.data);
    dispatch(action);
  });
};

export const removeTodolistThunk = (todolistId: string): ThunkType => (
  dispatch
) => {
  todolistsAPI.deleteTodolist(todolistId).then((res) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  });
};

export const addTodolistsThunk = (title: string): ThunkType => (dispatch) => {
  todolistsAPI.postTodolist(title).then((res) => {
    const action = addTodolistAC(res.data.data.item);
    dispatch(action);
  });
};

export const updateTodolistTitleThunk = (
  todolistId: string,
  title: string
): ThunkType => (dispatch) => {
  todolistsAPI.updateTodolist(todolistId, title).then((res) => {
    const action = updateTodolistTitleAC(todolistId, title);
    dispatch(action);
  });
};

// Types
export type ActionTodolistsTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof setTodolistsAC>;

export type SetTodosType = ReturnType<typeof setTodolistsAC>;
export type TodoListEntityType = TodolistType & {
  filter: FilterValuesType;
};
export type FilterValuesType = "All" | "Completed" | "Active";
