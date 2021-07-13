import React from "react";
import styles from "./App.module.scss";
import { Todolist } from "./Components/Todolist/Todolist";
import { useState } from "react";
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
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId_1, title: "What to buy", filter: "All" },
    {
      id: todoListId_2,
      title: "What to read",
      filter: "All",
    },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
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
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function removeTodoList(todoListId: string) {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
  }

  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: "All",
      title: title,
    };
    setTodoLists([todolist, ...todoLists]);
    setTasks({ ...tasks, [todolist.id]: [] });
  }

  function changeTodoListTitle(title: string, todoListId: string) {
    const updatedTodolist = todoLists.map((tl) => {
      if (tl.id === todoListId) {
        return { ...tl, title: title };
      }
      return tl;
    });
    setTodoLists(updatedTodolist);
  }

  //* Tasks functions
  const addTask = (title: string, todoListId: string) => {
    const newTask = { id: v1(), title: title, isDone: false };
    tasks[todoListId] = [newTask, ...tasks[todoListId]];
    setTasks({ ...tasks });
  };

  function removeTask(id: string, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].filter((t) => t.id !== id);
    setTasks({ ...tasks });
  }

  function checkboxChange(taskId: string, isDone: boolean, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].map((t) => {
      if (t.id === taskId) {
        return { ...t, isDone: isDone };
      }
      return t;
    });
    setTasks({ ...tasks });
  }

  function changeTaskTitle(taskId: string, title: string, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].map((t) => {
      if (t.id === taskId) {
        return { ...t, title: title };
      }
      return t;
    });
    setTasks({ ...tasks });
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
      <Container fixed>
        <Grid container className={styles.addItem}>
          <AddItem callback={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((tl) => {
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

export default App;
