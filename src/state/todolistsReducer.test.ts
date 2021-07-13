import { TodoListType, FilterValuesType } from "./../App";

import { todolistsReducer } from "./todolistsReducer";
import { v1 } from "uuid";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodoListType[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const endState = todolistsReducer(startState, {
    type: "REMOVE_TODOLIST",
    id: todolistId1,
  });

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const endState = todolistsReducer(startState, {
    type: "ADD_TODOLIST",
    title: newTodolistTitle,
  });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New Todolist");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const endState = todolistsReducer(startState, {
    type: "CHANGE_TODOLIST_TITLE",
    todoListId: todolistId2,
    title: newTodolistTitle,
  });

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "Completed";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  //   const action = {
  //     type: "CHANGE-TODOLIST-FILTER",
  //     id: todolistId2,
  //     filter: newFilter,
  //   };

  const endState = todolistsReducer(startState, {
    type: "CHANGE_FILTER",
    todoListId: todolistId2,
    value: newFilter,
  });

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
