import {
  tasksReducer,
  addTaskAC,
  removeTaskAC,
  updateTaskAC,
} from "./tasksReducer";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../../api/todolistsAPI";
import { addTodolistAC } from "./todolistsReducer";
import { TaskStateType } from "./TodolistsList ";

let todoListId_1: string;
let todoListId_2: string;
let startState: TaskStateType;

beforeEach(() => {
  todoListId_1 = v1();
  todoListId_2 = v1();

  startState = {
    [todoListId_1]: [
      {
        id: "5",
        title: "Apple",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_1,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "6",
        title: "Rice",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_1,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "7",
        title: "Milk",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_1,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "8",
        title: "Pears",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_1,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
    ],
    [todoListId_2]: [
      {
        id: "1",
        title: "Book",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "2",
        title: "News",
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "3",
        title: "Newspaper",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "4",
        title: "Tutorials",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
    ],
  };
});

test("correct task should be added", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      id: "5",
      title: "Buy milk",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Middle,
      description: "Description",
      todoListId: todoListId_2,
      deadline: "",
      order: 1,
      addedDate: "",
      startDate: "",
    })
  );

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
    updateTaskAC("2", { status: TaskStatuses.Draft }, todoListId_2)
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].status).toBe(3);
});

test("correct task should change title", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC("2", { title: "New News" }, todoListId_2)
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].title).toBe("New News");
});

test("new array should be added when new todolist is added", () => {
  const action = addTodolistAC({
    id: "12345",
    addedDate: "",
    order: 1,
    title: "React",
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId_1" && k !== "todolistId_2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
