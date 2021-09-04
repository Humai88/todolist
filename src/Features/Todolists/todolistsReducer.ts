import { todolistsAPI, TodolistType } from "./../../api/todolistsAPI";
import { v1 } from "uuid";
import { ThunkType } from "../../App/store";
import {
  RequestStatusType,
  setAppErrorAC,
  setAppStatusAC,
} from "../../App/appReducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/errorUtils";

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
          entityStatus: "idle",
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
        return { ...tl, filter: "All", entityStatus: "idle" };
      });
    case "TODOLIST/CHANGE_ENTITY_STATUS":
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, entityStatus: action.payload.entityStatus }
          : tl
      );
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
export const chandeTodolistEntityStatusAC = (
  id: string,
  entityStatus: RequestStatusType
) => {
  return {
    type: "TODOLIST/CHANGE_ENTITY_STATUS",
    payload: {
      id,
      entityStatus,
    },
  } as const;
};

// Thunks

export const fetchTodolistsThunk = (): ThunkType => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistsAC(res.data));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistThunk = (todolistId: string): ThunkType => (
  dispatch
) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(chandeTodolistEntityStatusAC(todolistId, "loading"));
  todolistsAPI
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(removeTodolistAC(todolistId));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistsThunk = (title: string): ThunkType => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .postTodolist(title)
    .then((res) => {
      if (res.data.resultCode == 0) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTodolistTitleThunk = (
  todolistId: string,
  title: string
): ThunkType => (dispatch) => {
  todolistsAPI
    .updateTodolist(todolistId, title)
    .then((res) => {
      if (res.data.resultCode == 0) {
        dispatch(updateTodolistTitleAC(todolistId, title));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// Types
export type ActionTodolistsTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof chandeTodolistEntityStatusAC>;

export type SetTodosType = ReturnType<typeof setTodolistsAC>;
export type TodoListEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type FilterValuesType = "All" | "Completed" | "Active";
