import { TaskStateType } from "../App/App";
import { tasksReducer } from "./tasksReducer";
import {
  addTodolistAC,
  removeTodolistAC,
  TodoListEntityType,
  todoListId_1,
  todoListId_2,
  todolistsReducer,
} from "./todolistsReducer";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: Array<TodoListEntityType> = [];

  const action = addTodolistAC({
    id: todoListId_1,
    addedDate: "",
    order: 1,
    title: "React",
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test("property with todolistId should be deleted", () => {
  const startState: TaskStateType = {
    todolistId1: [
      {
        id: "1",
        title: "Task one",
        status: 2,
        priority: 3,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "2",
        title: "Task two",
        status: 2,
        priority: 3,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "3",
        title: "Task three",
        status: 2,
        priority: 3,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Task four",
        status: 2,
        priority: 3,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
      {
        id: "2",
        title: "Task five",
        status: 2,
        priority: 3,
        description: "Description",
        todoListId: todoListId_2,
        deadline: "",
        order: 1,
        addedDate: "",
        startDate: "",
      },
    ],
  };

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
