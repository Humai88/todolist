import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { AppRootStateType } from "../../App/store";
import { useDispatch, useSelector } from "react-redux";
import { setAppErrorAC } from "../../App/appReducer";
import styles from "./ErrorSnackbar.module.scss";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
  const error = useSelector<AppRootStateType, null | string>(
    (state) => state.app.error
  );
  const dispatch = useDispatch();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert className={styles.message} onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
