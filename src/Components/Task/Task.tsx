import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "./../Checkbox/Checkbox";
import { EditableSpan } from "./../EditableSpan/EditableSpan";
import { FaTrash } from "react-icons/fa";
import styles from "./Task.module.scss";
import { TaskType } from "../../App";

type TaskPropsType = {
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  checkboxChange: (taskId: string, isDone: boolean, todoListId: string) => void;
  task: TaskType;
  todolistId: string;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const {
    removeTask,
    checkboxChange,
    changeTaskTitle,
    task,
    todolistId,
  } = props;

  const onRemoveHandler = () => {
    removeTask(task.id, todolistId);
  };

  const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    checkboxChange(task.id, e.currentTarget.checked, todolistId);
  };

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      changeTaskTitle(task.id, title, todolistId);
    },
    [changeTaskTitle, task.id, todolistId]
  );
  return (
    <li className={task.isDone ? styles.isDone : ""}>
      <div className={styles.wrapper}>
        <Checkbox checked={task.isDone} onChange={onCheckboxChangeHandler}>
          <EditableSpan
            className={styles.span}
            changeTaskTitle={changeTaskTitleHandler}
            title={task.title}
          />
        </Checkbox>

        <div className={styles.trash} onClick={onRemoveHandler}>
          <FaTrash />
        </div>
      </div>
    </li>
  );
});
