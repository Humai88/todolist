import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
export type filterValuesType = "all" | "completed" | "active";

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

  const [filter, setFilter] = useState<filterValuesType>("all");

  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;

  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  }

  return (
    <div className="app">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
