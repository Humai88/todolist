import React from "react";
// import { FaTimes, FaPlus } from "react-icons/fa";
import { filterValuesType } from "./App";
import { Button } from "./Components/Buttons/Button";
import { Input } from "./Components/Inputs/Input";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: filterValuesType) => void;
  addTask: (title: string) => void;
};

export const Todolist: React.FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}) => {
  const onAllClickHeandler = () => changeFilter("all");
  const onActiveClickHeandler = () => changeFilter("active");
  const onCompletedClickHeandler = () => changeFilter("completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <Input callback={(title: string) => addTask(title)} />
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
              {/* <button onClick={onRemoveHeandler}>
                <FaTimes style={{ color: "red" }} />
              </button> */}
              <Button title="x" callback={onRemoveHeandler} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button title="All" callback={onAllClickHeandler} />
        <Button title="Active" callback={onActiveClickHeandler} />
        <Button title="Completed" callback={onCompletedClickHeandler} />
      </div>
    </div>
  );
};
