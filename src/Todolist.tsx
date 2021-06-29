import React, { ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { FilterValuesType } from "./App";
import { Button } from "./Components/Buttons/Button";
import { AddItem } from "./Components/AddItem/AddItem";
import styles from "./Todolist.module.scss";
import { Checkbox } from "./Components/Checkbox/Checkbox";
import { EditableSpan } from "./Components/EditableSpan/EditableSpan";

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
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  changeTodoListTitle: (title: string, todoListId: string) => void;
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
  changeTaskTitle,
  changeTodoListTitle,
}) => {
  const onAllClickHandler = () => changeFilter("All", id);
  const onActiveClickHandler = () => changeFilter("Active", id);
  const onCompletedClickHandler = () => changeFilter("Completed", id);
  const onClickHandler = () => removeTodoList(id);
  const addTaskItem = (title: string) => {
    addTask(title, id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodoListTitle(title, id);
  };
  return (
    <div className={styles.wrapper}>
      <EditableSpan
        className={styles.header}
        title={title}
        changeTaskTitle={changeTodolistTitleHandler}
      />
      <div>
        <AddItem callback={addTaskItem} />
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

          const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(t.id, title, id);
          };
          return (
            <li key={t.id} className={t.isDone ? styles.isDone : ""}>
              <Checkbox
                type="checkbox"
                checked={t.isDone}
                onChange={onCheckboxChangeHandler}
              >
                <EditableSpan
                  changeTaskTitle={changeTaskTitleHandler}
                  title={t.title}
                />
              </Checkbox>

              <Button
                className={styles.btn}
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
      <div className={styles.btnsWrapper}>
        <Button
          className={styles.btn}
          filter={filter}
          title="All"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          className={styles.btn}
          filter={filter}
          title="Active"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          className={styles.btn}
          filter={filter}
          title="Completed"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>

        <Button
          title="RemoveAll"
          className={styles.btn}
          red={true}
          onClick={onClickHandler}
        >
          Remove all
        </Button>
      </div>
    </div>
  );
};
