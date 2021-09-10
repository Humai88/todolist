import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { initializeAppThunk, RequestStatusType } from "./appReducer";
import { ErrorSnackbar } from "../Components/ErrorSnackbar/ErrorSnackbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../Features/Todolists/Login/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import { logoutThunk } from "../Features/Todolists/Login/authReducer";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutThunk());
  };
  useEffect(() => {
    dispatch(initializeAppThunk());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar className={styles.navbar}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">TodoShka</Typography>

            {isLoggedIn && (
              <Button onClick={logoutHandler} color="inherit">
                Log Out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && (
            <LinearProgress className={styles.progress} color="secondary" />
          )}
        </AppBar>
        <Container className={styles.container} maxWidth="xl">
          <Switch>
            <Route exact path="/todolist" render={() => <TodolistsList />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route path={"/404"} render={() => <h1>404: PAGE NOT FOUND</h1>} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Container>
        <ErrorSnackbar />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
