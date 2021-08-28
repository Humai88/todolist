import { Grid, Paper } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskStatuses, TaskType } from "../../api/todolistsAPI";
import { AddItem } from "../../Components/AddItem/AddItem";
import { Todolist } from "./Todolist/Todolist";
import { AppRootStateType } from "../../App/store";
import { addTaskThunk, removeTaskThunk, updateTaskThunk } from "./tasksReducer";
import {
  addTodolistsThunk,
  changeFilterAC,
  fetchTodolistsThunk,
  FilterValuesType,
  removeTodolistThunk,
  TodoListEntityType,
  updateTodolistTitleThunk,
} from "./todolistsReducer";
import styles from "./TodolistsList.module.scss";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};
export const TodolistsList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TaskStateType>(
    (state) => state.tasks
  );
  const todolists = useSelector<AppRootStateType, TodoListEntityType[]>(
    (state) => state.todolists
  );

  // TDlists functions
  const changeFilter = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      const action = changeFilterAC(value, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(removeTodolistThunk(todoListId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistsThunk(title));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchTodolistsThunk);
  }, []);

  const changeTodoListTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(updateTodolistTitleThunk(todolistId, title));
    },
    [dispatch]
  );

  //Tasks functions

  const addTask = useCallback(
    (title: string, todoListId: string) => {
      dispatch(addTaskThunk(todoListId, title));
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      dispatch(removeTaskThunk(id, todoListId));
    },
    [dispatch]
  );

  const checkboxChange = useCallback(
    (taskId: string, status: TaskStatuses, todoListId: string) => {
      dispatch(updateTaskThunk(taskId, { status }, todoListId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todoListId: string) => {
      dispatch(updateTaskThunk(taskId, { title }, todoListId));
    },
    [dispatch]
  );

  return (
    <>
      <Grid container className={styles.addItem}>
        <AddItem callback={addTodolist} />
      </Grid>

      <Grid container spacing={0}>
        {todolists.map((tl) => {
          let tasksForTodoList = tasks[tl.id];

          return (
            <Grid key={tl.id}>
              <Paper
                style={{ padding: "1rem", backgroundColor: "#202d47" }}
                elevation={0}
                variant="outlined"
                className={styles.paper}
              >
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  filter={tl.filter}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  checkboxChange={checkboxChange}
                  removeTodoList={removeTodoList}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

// Types
