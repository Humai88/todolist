import React, { useCallback, useEffect } from "react";
// import { Button } from "../../../Components/Buttons/Button";
import { AddItem } from "../../../Components/AddItem/AddItem";
import styles from "./Todolist.module.scss";
import { EditableSpan } from "../../../Components/EditableSpan/EditableSpan";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolistsAPI";
import { useDispatch } from "react-redux";
import { FilterValuesType } from "../todolistsReducer";
import { fetchTasksThunk } from "../tasksReducer";
import { RequestStatusType } from "../../../App/appReducer";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { Delete } from "@material-ui/icons";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  checkboxChange: (
    taskId: string,
    status: TaskStatuses,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  id: string;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, title: string) => void;
  entityStatus: RequestStatusType;
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
    entityStatus,
  } = props;
  const dispatch = useDispatch();
  const onAllClickHandler = useCallback(() => changeFilter("All", id), [
    changeFilter,
    id,
  ]);

  const onActiveClickHandler = useCallback(() => changeFilter("Active", id), [
    changeFilter,
    id,
  ]);

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
      changeTodoListTitle(id, title);
    },
    [changeTodoListTitle, id]
  );

  let tasksForTodoList = tasks;
  if (filter === "Completed") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  if (filter === "Active") {
    tasksForTodoList = tasks.filter((t) => t.status === TaskStatuses.New);
  }

  useEffect(() => {
    dispatch(fetchTasksThunk(id));
  }, []);
  return (
    <div>
      <h3>
        <EditableSpan
          className={styles.span}
          title={title}
          changeTaskTitle={changeTodolistTitleHandler}
        />
      </h3>
      <AddItem callback={addTaskItem} />
      <div>
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
      </div>
      <div className={styles.btnsWrapper}>
        <Button
          className={styles.btn}
          variant={filter === "All" ? "contained" : "text"}
          onClick={onAllClickHandler}
          color={"secondary"}
        >
          All
        </Button>
        <Button
          className={styles.btn}
          variant={filter === "Active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color={"secondary"}
        >
          Active
        </Button>
        <Button
          className={styles.btn}
          variant={filter === "Completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
        <Button
          className={styles.deleteBtn}
          disabled={entityStatus === "loading"}
          onClick={onClickHandler}
        >
          Remove all
        </Button>
      </div>
    </div>
  );
});
