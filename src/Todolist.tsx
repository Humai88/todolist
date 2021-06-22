import React, { ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { filterValuesType } from "./App";
import { Button } from "./Components/Buttons/Button";
import { Input } from "./Components/Inputs/Input";
import "./App.css";

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
  checkboxChange: (taskId: string, isDone: boolean) => void;
  filter: filterValuesType;
};

export const Todolist: React.FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  checkboxChange,
  filter,
}) => {
  const onAllClickHeandler = () => changeFilter("All");
  const onActiveClickHeandler = () => changeFilter("Active");
  const onCompletedClickHeandler = () => changeFilter("Completed");

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <Input callback={addTask} />
      </div>
      <ul>
        {tasks.map((t) => {
          const onRemoveHeandler = () => {
            removeTask(t.id);
          };

          const onCheckboxChangeHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            checkboxChange(t.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id} className={t.isDone ? "isDone" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onCheckboxChangeHandler}
              />
              <span>{t.title}</span>
              <Button
                title={<FaTimes style={{ color: "red" }} />}
                callback={onRemoveHeandler}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <Button filter={filter} title="All" callback={onAllClickHeandler} />
        <Button
          filter={filter}
          title="Active"
          callback={onActiveClickHeandler}
        />
        <Button
          filter={filter}
          title="Completed"
          callback={onCompletedClickHeandler}
        />
      </div>
    </div>
  );
};
