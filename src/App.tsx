import React, { useCallback, useEffect } from "react";
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
  addTaskThunk,
  removeTaskThunk,
  updateTaskThunk,
} from "./state/tasksReducer";
import {
  addTodolistsThunk,
  changeFilterAC,
  fetchTodolistsThunk,
  FilterValuesType,
  removeTodolistThunk,
  TodoListEntityType,
  updateTodolistTitleThunk,
} from "./state/todolistsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskStatuses, TaskType, todolistsAPI } from "./api/todolistsAPI";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
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

        <Grid container className={styles.todoWrapper} spacing={0}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasks[tl.id];

            return (
              <div key={tl.id}>
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
              </div>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
function rremoveTodolistThunk(todoListId: string) {
  throw new Error("Function not implemented.");
}
