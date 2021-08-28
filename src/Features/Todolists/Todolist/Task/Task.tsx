import React, { ChangeEvent, useCallback } from "react";

import { EditableSpan } from "../../../../Components/EditableSpan/EditableSpan";
import { FaTrash } from "react-icons/fa";
import styles from "./Task.module.scss";
import { TaskStatuses, TaskType } from "../../../../api/todolistsAPI";
import SuperCheckbox from "../../../../Components/Checkbox/SuperCheckbox";

type TaskPropsType = {
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  checkboxChange: (
    taskId: string,
    status: TaskStatuses,
    todoListId: string
  ) => void;
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
    checkboxChange(
      task.id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      todolistId
    );
  };

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      changeTaskTitle(task.id, title, todolistId);
    },
    [changeTaskTitle, task.id, todolistId]
  );
  return (
    <li className={task.status === TaskStatuses.Completed ? styles.isDone : ""}>
      <div className={styles.wrapper}>
        <SuperCheckbox
          checked={task.status === TaskStatuses.Completed}
          onChange={onCheckboxChangeHandler}
        >
          <EditableSpan
            className={styles.span}
            changeTaskTitle={changeTaskTitleHandler}
            title={task.title}
          />
        </SuperCheckbox>

        <div className={styles.trash} onClick={onRemoveHandler}>
          <FaTrash />
        </div>
      </div>
    </li>
  );
});
