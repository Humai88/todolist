import {
  tasksReducer,
  addTaskAC,
  removeTaskAC,
  statusChangeAC,
  changeTaskTitleAC,
} from "./tasksReducer";
import { v1 } from "uuid";
import { TaskStateType } from "./../App";
import { addTodolistAC } from "./todolistsReducer";

let todoListId_1: string;
let todoListId_2: string;
let startState: TaskStateType;

beforeEach(() => {
  todoListId_1 = v1();
  todoListId_2 = v1();

  startState = {
    [todoListId_1]: [
      { id: "5", title: "Apple", isDone: true },
      { id: "6", title: "Rice", isDone: false },
      { id: "7", title: "Milk", isDone: true },
      { id: "8", title: "Pears", isDone: true },
    ],
    [todoListId_2]: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "News", isDone: false },
      { id: "3", title: "Newspaper", isDone: true },
      { id: "4", title: "Tutorials", isDone: true },
    ],
  };
});

test("correct task should be added", () => {
  let newTask = "Buy milk";

  const endState = tasksReducer(startState, addTaskAC(newTask, todoListId_2));

  expect(endState[todoListId_2].length).toBe(5);
  expect(endState[todoListId_2][0].title).toBe("Buy milk");
});

test("correct task should be removed", () => {
  const endState = tasksReducer(startState, removeTaskAC("2", todoListId_2));

  expect(endState[todoListId_2].length).toBe(3);
  expect(endState[todoListId_2][1].title).toBe("Newspaper");
});

test("correct task should change status", () => {
  const endState = tasksReducer(
    startState,
    statusChangeAC("2", true, todoListId_2)
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].isDone).toBe(true);
});

test("correct task should change title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC("2", "Games", todoListId_2)
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].title).toBe("Games");
});

test("new array should be added when new todolist is added", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
