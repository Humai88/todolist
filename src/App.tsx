import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
export type filterValuesType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: false },
    { id: 3, title: "JS", isDone: true },
  ]);

  const [filter, setFilter] = useState<filterValuesType>("all");

  function removeTask(id: number) {
    setTasks(tasks.filter((elem) => elem.id !== id));
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((elem) => elem.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((elem) => elem.isDone === false);
  }

  return (
    <div className="app">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
