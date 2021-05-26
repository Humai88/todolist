import React from "react";
import "./App.css";
import Todo from "./Todo";

function App() {
  const tasks1 = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: false },
    { id: 3, title: "JS", isDone: true },
  ];
  const tasks2 = [
    { id: 1, title: "Bootstrap", isDone: false },
    { id: 2, title: "Java", isDone: true },
    { id: 3, title: "Ajax", isDone: false },
  ];
  return (
    <div className="app">
      <Todo title="What to learn" tasks={tasks1} />
      <Todo title="Songs" tasks={tasks2} />
      {/* <Todo title="Books" task={tasks3} /> */}
    </div>
  );
}

export default App;
