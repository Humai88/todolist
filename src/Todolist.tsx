import React, { ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { FilterValuesType } from "./App";
import { Button } from "./Components/Buttons/Button";
import { InputAddContainer } from "./Components//Input&Add/InputAddContainer";
import s from "./App.module.css";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string) => void;
  checkboxChange: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
  id: string;
};

export const Todolist: React.FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  checkboxChange,
  filter,
  id,
}) => {
  const onAllClickHeandler = () => changeFilter("All", id);
  const onActiveClickHeandler = () => changeFilter("Active", id);
  const onCompletedClickHeandler = () => changeFilter("Completed", id);

  return (
    <div className={s.wrapper}>
      <h3>{title}</h3>
      <div>
        <InputAddContainer callback={addTask} />
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
            <li key={t.id} className={t.isDone ? s.isDone : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onCheckboxChangeHandler}
              />
              <span>{t.title}</span>
              <Button red={true} onClick={onRemoveHeandler} title="Delete">
                {<FaTimes style={{ color: "red" }} />}
              </Button>
            </li>
          );
        })}
      </ul>
      <div>
        <Button filter={filter} title="All" onClick={onAllClickHeandler}>
          All
        </Button>
        <Button filter={filter} title="Active" onClick={onActiveClickHeandler}>
          Active
        </Button>
        <Button
          filter={filter}
          title="Completed"
          onClick={onCompletedClickHeandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
