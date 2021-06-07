import React from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { filterValuesType } from "./App";

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (value: filterValuesType) => void;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}: PropsType) => {
  const onAllClickHeandler = () => changeFilter("all");
  const onActiveClickHeandler = () => changeFilter("active");
  const onCompletedClickHeandler = () => changeFilter("completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>
          <FaPlus />
        </button>
      </div>
      <ul>
        {tasks.map((t) => {
          const onRemoveHeandler = () => {
            removeTask(t.id);
          };
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHeandler}>
                <FaTimes style={{ color: "red" }} />
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHeandler}>All</button>
        <button onClick={onActiveClickHeandler}>Active</button>
        <button onClick={onCompletedClickHeandler}>Completed</button>
      </div>
    </div>
  );
};
