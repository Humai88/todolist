import styles from "./Login.module.scss";
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "./authReducer";
import { AppRootStateType } from "../../../App/store";
import { Redirect } from "react-router";

export const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length <= 2) {
        errors.password = "Password must be at least 2 characters long";
      }
      return errors;
    },

    onSubmit: (values) => {
      formik.resetForm();
      dispatch(loginThunk(values));
    },
  });

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered &nbsp;
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.email ? (
                <div style={{ color: "#F55F59" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="rememberMe"
                    value={formik.values.rememberMe}
                    onBlur={formik.handleBlur}
                  />
                }
              />
              <Button
                type={"submit"}
                className={styles.btn}
                variant={"contained"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

// Types
type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
