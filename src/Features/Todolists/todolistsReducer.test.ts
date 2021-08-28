import {
  todolistsReducer,
  addTodolistAC,
  removeTodolistAC,
  changeFilterAC,
  FilterValuesType,
  TodoListEntityType,
  updateTodolistTitleAC,
} from "./todolistsReducer";
import { v1 } from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: TodoListEntityType[];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, addedDate: "", order: 1, title: "React", filter: "All" },
    { id: todolistId2, addedDate: "", order: 1, title: "CSS", filter: "All" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todolistsReducer(
    startState,
    addTodolistAC({ id: "1234567", addedDate: "", order: 1, title: "Redux" })
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("Redux");
});

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(
    startState,
    updateTodolistTitleAC(todolistId2, "Redux")
  );

  expect(endState[0].title).toBe("React");
  expect(endState[1].title).toBe("Redux");
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "Completed";

  const endState = todolistsReducer(
    startState,
    changeFilterAC(newFilter, todolistId2)
  );

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
