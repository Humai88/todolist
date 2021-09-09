import { authAPI } from "../api/todolistsAPI";
import { setIsLoggedInAC } from "../Features/Todolists/Login/authReducer";
import { ThunkType } from "./store";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionAppTypes
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.payload.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.payload.error };
    case "APP/SET-INITIALISATION":
      return { ...state, isInitialized: action.payload.isInitialized };
    default:
      return { ...state };
  }
};

// Actions
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    payload: {
      status,
    },
  } as const;
};
export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "APP/SET-INITIALISATION",
    payload: {
      isInitialized,
    },
  } as const;
};
export const setAppErrorAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR",
    payload: {
      error,
    },
  } as const;
};
// Thunks
export const initializeAppThunk = (): ThunkType => (dispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      }
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};

// Types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInicialisationType = ReturnType<typeof setIsInitializedAC>;
export type ActionAppTypes =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInicialisationType;
export type InitialStateType = typeof initialState;
