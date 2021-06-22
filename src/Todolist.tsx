import React, { ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { FilterValuesType } from "./App";
import { Button } from "./Components/Buttons/Button";
import { InputAddContainer } from "./Components//Input&Add/InputAddContainer";
import s from "./App.module.css";
import { Checkbox } from "./Components/Checkbox/Checkbox";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  checkboxChange: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodoList: (todoListId: string) => void;
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
  removeTodoList,
}) => {
  const onAllClickHandler = () => changeFilter("All", id);
  const onActiveClickHandler = () => changeFilter("Active", id);
  const onCompletedClickHandler = () => changeFilter("Completed", id);
  const onClickHandler = () => removeTodoList(id);
  return (
    <div className={s.wrapper}>
      <h3 className={s.header}>{title}</h3>
      <div>
        <InputAddContainer id={id} callback={addTask} />
      </div>
      <ul>
        {tasks.map((t) => {
          const onRemoveHandler = () => {
            removeTask(t.id, id);
          };
          const onCheckboxChangeHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            checkboxChange(t.id, e.currentTarget.checked, id);
          };
          return (
            <li key={t.id} className={t.isDone ? s.isDone : ""}>
              <Checkbox
                type="checkbox"
                checked={t.isDone}
                onChange={onCheckboxChangeHandler}
              >
                {t.title}
              </Checkbox>

              <Button
                className={s.btn}
                red={true}
                onClick={onRemoveHandler}
                title="Delete"
              >
                {<FaTimes style={{ color: "red" }} />}
              </Button>
            </li>
          );
        })}
      </ul>
      <div className={s.btnsWrapper}>
        <Button
          className={s.btn}
          filter={filter}
          title="All"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          className={s.btn}
          filter={filter}
          title="Active"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          className={s.btn}
          filter={filter}
          title="Completed"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>

        <Button
          title="RemoveAll"
          className={s.btn}
          red={true}
          onClick={onClickHandler}
        >
          Remove all
        </Button>
      </div>
    </div>
  );
};
