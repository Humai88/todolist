import { todolistsAPI, TodolistType } from "./../api/todolistsAPI";
import { v1 } from "uuid";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

export type TodoListEntityType = TodolistType & {
  filter: FilterValuesType;
};
export const todoListId_1 = v1();
export const todoListId_2 = v1();
export type FilterValuesType = "All" | "Completed" | "Active";

const initialState: TodoListEntityType[] = [
  // { id: todoListId_1, addedDate: "", order: 1, title: "React", filter: "All" },
  // {
  //   id: todoListId_2,
  //   addedDate: "",
  //   order: 2,
  //   title: "TypeScript",
  //   filter: "All",
  // },
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
      const newTodolist: TodoListEntityType = {
        ...action.payload.todolist,
        filter: "All",
      };
      return [newTodolist, ...state];
    case "UPDATE_TODOLIST_TITLE":
      const todolist = state.find((tl) => tl.id === action.payload.todolistId);
      if (todolist) {
        todolist.title = action.payload.title;
      }
      return [...state];
    case "SET_TODOLISTS":
      return action.payload.todos.map((tl) => {
        return { ...tl, filter: "All" };
      });

    default:
      return state;
  }
};

export type ActionTodolistsTypes =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof setTodolistsAC>;

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
export const changeFilterAC = (value: FilterValuesType, todoListId: string) => {
  return {
    type: "CHANGE_FILTER",
    payload: {
      value,
      todoListId,
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
export type SetTodosType = ReturnType<typeof setTodolistsAC>;

// Thunks

export const fetchTodolistsThunk = (dispatch: Dispatch): void => {
  todolistsAPI.getTodolists().then((res) => {
    const action = setTodolistsAC(res.data);
    dispatch(action);
  });
};

export const removeTodolistThunk = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      const action = removeTodolistAC(todolistId);
      dispatch(action);
    });
  };
};

export const addTodolistsThunk = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.postTodolist(title).then((res) => {
      const action = addTodolistAC(res.data.data.item);
      dispatch(action);
    });
  };
};

export const updateTodolistTitleThunk = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title).then((res) => {
      const action = updateTodolistTitleAC(todolistId, title);
      dispatch(action);
    });
  };
};
