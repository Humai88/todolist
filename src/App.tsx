import React from "react";
import s from "./App.module.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: false },
    { id: v1(), title: "JS", isDone: true },
  ]);

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  // const [filter, setFilter] = useState<FilterValuesType>("All");

  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function checkboxChange(taskId: string, isDone: boolean) {
    let currentTask = tasks.find((t) => t.id === taskId);
    if (currentTask) {
      currentTask.isDone = isDone;
    }
    let newTasks = [...tasks];
    setTasks(newTasks);
  }

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: v1(), title: "What to buy", filter: "All" },
    {
      id: v1(),
      title: "What to read",
      filter: "Completed",
    },
    { id: v1(), title: "What to learn", filter: "Active" },
  ]);

  return (
    <div className={s.app}>
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks;

        if (tl.filter === "Completed") {
          tasksForTodoList = tasks.filter((t) => t.isDone);
        }
        if (tl.filter === "Active") {
          tasksForTodoList = tasks.filter((t) => !t.isDone);
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
          />
        );
      })}
    </div>
  );
}

export default App;
