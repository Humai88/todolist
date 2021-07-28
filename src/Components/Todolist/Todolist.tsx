import React, { ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { FilterValuesType, TaskType } from "./../../App";
import { Button } from "./../Buttons/Button";
import { AddItem } from "./../AddItem/AddItem";
import styles from "./Todolist.module.scss";
import Checkbox from "./../Checkbox/Checkbox";
import { EditableSpan } from "./../EditableSpan/EditableSpan";

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

      <AddItem callback={addTaskItem} />

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
              <Checkbox checked={t.isDone} onChange={onCheckboxChangeHandler}>
                <EditableSpan
                  className={styles.span}
                  changeTaskTitle={changeTaskTitleHandler}
                  title={t.title}
                />
              </Checkbox>

              <div className={styles.trash} onClick={onRemoveHandler}>
                <FaTrash />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.btnsWrapper}>
        <Button
          className={styles.filterBtns}
          filter={filter}
          title="All"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          className={styles.filterBtns}
          filter={filter}
          title="Active"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          className={styles.filterBtns}
          filter={filter}
          title="Completed"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>

        <Button
          className={styles.filterBtns}
          title="RemoveAll"
          red
          onClick={onClickHandler}
        >
          Remove all
        </Button>
      </div>
    </div>
  );
};
