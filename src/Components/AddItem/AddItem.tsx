import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import styles from "./AddItem.module.scss";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { AddBox } from "@material-ui/icons";

type PropsType = {
  callback: (title: string) => void;
  disabled?: boolean;
};
export const AddItem: React.FC<PropsType> = React.memo(
  ({ callback, disabled }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
      setError(false);
    };

    const onClickHandler = () => {
      if (newTaskTitle.trim() !== "") {
        callback(newTaskTitle.trim());
        setNewTaskTitle("");
      } else {
        setError(true);
      }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) {
        setError(false);
      }

      if (e.key === "Enter") {
        onClickHandler();
      }
    };

    return (
      <div className={styles.wrapper}>
        <TextField
          className={styles.textField}
          variant="outlined"
          error={error}
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          label="Title"
          helperText={error}
          disabled={disabled}
        />
        <IconButton
          color="primary"
          className={styles.btnAdd}
          onClick={onClickHandler}
          disabled={disabled}
        >
          <AddBox />
        </IconButton>
        {error && (
          <span className={error ? styles.errorMessage : ""}>
            "Title is required!"
          </span>
        )}
      </div>
    );
  }
);

// import {
//   Box,
//   Button,
//   FormControl,
//   IconButton,
//   TextField,
// } from "@material-ui/core";
// import { AddBox } from "@material-ui/icons";

// type AddItemFormPropsType = {
//   addItem: (title: string) => void;
// };

// export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
//   console.log("AddItemForm called");

//   let [title, setTitle] = useState("");
//   let [error, setError] = useState<string | null>(null);

//   const addItem = () => {
//     if (title.trim() !== "") {
//       props.addItem(title);
//       setTitle("");
//     } else {
//       setError("Title is required");
//     }
//   };

//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value);
//   };

//   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (error !== null) {
//       setError(null);
//     }
//     if (e.charCode === 13) {
//       addItem();
//     }
//   };

//   return (
//     <div>
//       <TextField
//         variant="outlined"
//         error={!!error}
//         value={title}
//         onChange={onChangeHandler}
//         onKeyPress={onKeyPressHandler}
//         label="Title"
//         helperText={error}
//       />
//       <IconButton color="primary" onClick={addItem}>
//         <AddBox />
//       </IconButton>
//     </div>
//   );
// });
