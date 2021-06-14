import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type filterValuesType = "All" | "Completed" | "Active";

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

  const [filter, setFilter] = useState<filterValuesType>("All");

  function removeTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }

  function checkboxChange(taskId: string, isDone: boolean) {
    let currentTask = tasks.find((t) => t.id === taskId);
    if (currentTask) {
      currentTask.isDone = isDone;
    }
    let newTasks = [...tasks];
    setTasks(newTasks);
  }

  let tasksForTodoList = tasks;

  if (filter === "Completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  }
  if (filter === "Active") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }

  return (
    <div className="app">
      <Todolist
        filter={filter}
        title="What to learn"
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        checkboxChange={checkboxChange}
      />
    </div>
  );
}

export default App;
