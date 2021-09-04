import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../../../../Components/EditableSpan/EditableSpan";
import styles from "./Task.module.scss";
import { TaskStatuses, TaskType } from "../../../../api/todolistsAPI";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { Delete } from "@material-ui/icons";
import { RequestStatusType } from "../../../../App/appReducer";

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
  entityStatus: RequestStatusType;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const {
    removeTask,
    checkboxChange,
    changeTaskTitle,
    task,
    todolistId,
    entityStatus,
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
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={onCheckboxChangeHandler}
        />

        <EditableSpan
          className={styles.span}
          changeTaskTitle={changeTaskTitleHandler}
          title={task.title}
          disabled={entityStatus === "loading"}
        />

        <IconButton className={styles.trash} onClick={onRemoveHandler}>
          <Delete />
        </IconButton>
      </div>
    </li>
  );
});
