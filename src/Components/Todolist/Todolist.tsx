import React, { useCallback } from "react";
import { FilterValuesType, TaskType } from "./../../App";
import { Button } from "./../Buttons/Button";
import { AddItem } from "./../AddItem/AddItem";
import styles from "./Todolist.module.scss";
import { EditableSpan } from "./../EditableSpan/EditableSpan";
import { Task } from "../Task/Task";

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

export const Todolist: React.FC<PropsType> = React.memo((props) => {
  const {
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
  } = props;

  const onAllClickHandler = useCallback(
    () => changeFilter("All", id),
    [changeFilter, id]
  );
  const onActiveClickHandler = useCallback(
    () => changeFilter("Active", id),
    [changeFilter, id]
  );
  const onCompletedClickHandler = useCallback(
    () => changeFilter("Completed", id),
    [changeFilter, id]
  );
  const onClickHandler = () => removeTodoList(id);
  const addTaskItem = useCallback(
    (title: string) => {
      addTask(title, id);
    },
    [addTask, id]
  );

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodoListTitle(title, id);
    },
    [changeTodoListTitle, id]
  );

  let tasksForTodoList = tasks;
  if (filter === "Completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  }
  if (filter === "Active") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }

  return (
    <div className={styles.wrapper}>
      <EditableSpan
        className={styles.header}
        title={title}
        changeTaskTitle={changeTodolistTitleHandler}
      />

      <AddItem callback={addTaskItem} />

      <ul>
        {tasksForTodoList.map((t) => (
          <Task
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            checkboxChange={checkboxChange}
            task={t}
            todolistId={id}
            key={t.id}
          />
        ))}
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
});
