import {
  appReducer,
  InitialStateType,
  setAppErrorAC,
  setAppStatusAC,
} from "./appReducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: true,
  };
});

test("correct error should be set", () => {
  const endState = appReducer(startState, setAppErrorAC("Error 404"));
  expect(endState.error).toBe("Error 404");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatusAC("loading"));
  expect(endState.status).toBe("loading");
});
