import React, { useCallback } from "react";
import styles from "./App.module.scss";
import { Todolist } from "./Components/Todolist/Todolist";
import { AddItem } from "./Components/AddItem/AddItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  addTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
  statusChangeAC,
} from "./state/tasksReducer";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolistsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "All" | "Completed" | "Active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TaskStateType>(
    (state) => state.tasks
  );
  const todolists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todolists
  );
  console.log(tasks);

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
      const action = removeTodolistAC(todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (title: string, todoListId: string) => {
      const action = changeTodolistTitleAC(title, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  //Tasks functions
  const addTask = useCallback(
    (title: string, todoListId: string) => {
      const action = addTaskAC(title, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      const action = removeTaskAC(id, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const checkboxChange = useCallback(
    (taskId: string, isDone: boolean, todoListId: string) => {
      const action = statusChangeAC(taskId, isDone, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todoListId: string) => {
      const action = changeTaskTitleAC(taskId, title, todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className={styles.navbar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">TodoShka</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Grid container className={styles.addItem}>
          <AddItem callback={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasks[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper
                  style={{ padding: "1rem", backgroundColor: "#202d47" }}
                  elevation={0}
                  variant="outlined"
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
      </Container>
    </React.Fragment>
  );
}

export default App;
