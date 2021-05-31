import React from "react";
import { FaTimes } from "react-icons/fa";
import { filterValuesType } from "./App";

interface TaskType {
  id: number;
  title: string;
  isDone: boolean;
}

interface PropsType {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (value: filterValuesType) => void;
}

export const Todolist: React.FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
      </div>
      <ul>
        {tasks.map((elem) => {
          return (
            <li key={elem.id}>
              <input type="checkbox" checked={elem.isDone} />
              <span>{elem.title}</span>
              <button
                onClick={() => {
                  removeTask(elem.id);
                }}
              >
                <FaTimes style={{ color: "red" }} />
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
