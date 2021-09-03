import React from "react";
import styles from "./App.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TodolistsList } from "../Features/Todolists/TodolistsList ";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { RequestStatusType } from "./appReducer";
import { ErrorSnackbar } from "../Components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
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
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
      <Container className={styles.container} maxWidth="xl">
        <TodolistsList />
      </Container>
      <ErrorSnackbar />
    </React.Fragment>
  );
}

export default App;
