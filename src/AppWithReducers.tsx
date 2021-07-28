import React, { useReducer } from "react";
import styles from "./App.module.scss";
import { Todolist } from "./Components/Todolist/Todolist";
import { v1 } from "uuid";
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
  tasksReducer,
} from "./state/tasksReducer";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolistsReducer";

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

function AppWithReducers() {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todoListId_1, title: "What to buy", filter: "All" },
    {
      id: todoListId_2,
      title: "What to read",
      filter: "All",
    },
  ]);

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListId_1]: [
      { id: v1(), title: "Apple", isDone: true },
      { id: v1(), title: "Rice", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Pears", isDone: true },
    ],
    [todoListId_2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "News", isDone: false },
      { id: v1(), title: "Newspaper", isDone: true },
      { id: v1(), title: "Tutorials", isDone: true },
    ],
  });

  //* Todolists functions
  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeFilterAC(value, todoListId);
    dispatchToTodolists(action);
  }

  function removeTodoList(todoListId: string) {
    const action = removeTodolistAC(todoListId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasks(action);
    dispatchToTodolists(action);
  }

  function changeTodoListTitle(title: string, todoListId: string) {
    const action = changeTodolistTitleAC(title, todoListId);
    dispatchToTodolists(action);
  }

  //* Tasks functions
  const addTask = (title: string, todoListId: string) => {
    const action = addTaskAC(title, todoListId);
    dispatchToTasks(action);
  };

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId);
    dispatchToTasks(action);
  }

  function checkboxChange(taskId: string, isDone: boolean, todoListId: string) {
    const action = statusChangeAC(taskId, isDone, todoListId);
    dispatchToTasks(action);
  }

  function changeTaskTitle(taskId: string, title: string, todoListId: string) {
    const action = changeTaskTitleAC(taskId, title, todoListId);
    dispatchToTasks(action);
  }

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
            if (tl.filter === "Completed") {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
            }
            if (tl.filter === "Active") {
              tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
            }
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

export default AppWithReducers;
