import {
  tasksReducer,
  addTaskAC,
  removeTaskAC,
  statusChangeAC,
  changeTaskTitleAC,
} from "./tasksReducer";
import { v1 } from "uuid";
import { TaskStateType } from "./../App";

test("correct task should be added", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  let newTask = "Buy milk";

  const startState: TaskStateType = {
    [todoListId_1]: [
      { id: v1(), title: "Apple", isDone: true },
      { id: v1(), title: "Rice", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Pears", isDone: true },
    ],
    [todoListId_2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "News", isDone: false },
      { id: v1(), title: "Newspaper", isDone: true },
      { id: v1(), title: "Tutorials", isDone: true },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC(newTask, todoListId_2));

  expect(endState[todoListId_2].length).toBe(5);
  expect(endState[todoListId_2][0].title).toBe("Buy milk");
});

test("correct task should be removed", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const taskId_1 = v1();
  const taskId_2 = v1();
  const taskId_3 = v1();
  const taskId_4 = v1();

  const startState: TaskStateType = {
    [todoListId_1]: [
      { id: v1(), title: "Apple", isDone: true },
      { id: v1(), title: "Rice", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
    [todoListId_2]: [
      { id: taskId_1, title: "Book", isDone: true },
      { id: taskId_2, title: "News", isDone: false },
      { id: taskId_3, title: "Newspaper", isDone: true },
      { id: taskId_4, title: "Tutorials", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    removeTaskAC(todoListId_2, taskId_2)
  );

  expect(endState[todoListId_2].length).toBe(3);
  expect(endState[todoListId_2][1].title).toBe("Newspaper");
});

test("correct task should change status", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const taskId_1 = v1();
  const taskId_2 = v1();
  const taskId_3 = v1();
  const taskId_4 = v1();

  const startState: TaskStateType = {
    [todoListId_1]: [
      { id: v1(), title: "Apple", isDone: true },
      { id: v1(), title: "Rice", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
    [todoListId_2]: [
      { id: taskId_1, title: "Book", isDone: true },
      { id: taskId_2, title: "News", isDone: false },
      { id: taskId_3, title: "Newspaper", isDone: true },
      { id: taskId_4, title: "Tutorials", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    statusChangeAC(todoListId_2, taskId_2, true)
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].isDone).toBe(true);
});

test("correct task should change status", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const taskId_1 = v1();
  const taskId_2 = v1();
  const taskId_3 = v1();
  const taskId_4 = v1();

  const startState: TaskStateType = {
    [todoListId_1]: [
      { id: v1(), title: "Apple", isDone: true },
      { id: v1(), title: "Rice", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
    [todoListId_2]: [
      { id: taskId_1, title: "Book", isDone: true },
      { id: taskId_2, title: "News", isDone: false },
      { id: taskId_3, title: "Newspaper", isDone: true },
      { id: taskId_4, title: "Tutorials", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    changeTaskTitleAC(todoListId_2, taskId_2, "Games")
  );

  expect(endState[todoListId_2].length).toBe(4);
  expect(endState[todoListId_2][1].title).toBe("Games");
});
