import React from "react";
import styles from "./App.module.scss";
import { Todolist, TaskType } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItem } from "./Components/AddItem/AddItem";

export type FilterValuesType = "All" | "Completed" | "Active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const todoListId_3 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId_1, title: "What to buy", filter: "All" },
    {
      id: todoListId_2,
      title: "What to read",
      filter: "All",
    },
    { id: todoListId_3, title: "What to learn", filter: "All" },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
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
    [todoListId_3]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
  });

  const addTask = (title: string, todoListId: string) => {
    const newTask = { id: v1(), title: title, isDone: false };
    tasks[todoListId] = [newTask, ...tasks[todoListId]];
    setTasks({ ...tasks });
  };

  function removeTask(id: string, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].filter((t) => t.id !== id);
    setTasks({ ...tasks });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function checkboxChange(taskId: string, isDone: boolean, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].map((t) => {
      if (t.id === taskId) {
        return { ...t, isDone: isDone };
      }
      return t;
    });
    setTasks({ ...tasks });
  }

  function removeTodoList(todoListId: string) {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
  }

  return (
    <div className={styles.app}>
      <AddItem
        callback={(title: string) => {
          alert(title);
        }}
      />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === "Completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
        }
        if (tl.filter === "Active") {
          tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            checkboxChange={checkboxChange}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
