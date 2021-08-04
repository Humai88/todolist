import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./EditableSpan.module.scss";

type PropsType = {
  title: string;
  changeTaskTitle: (title: string) => void;
  className?: string;
};

export const EditableSpan: React.FC<PropsType> = React.memo(
  ({ title, changeTaskTitle, className }) => {
    console.log("EditableSpan was called");

    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string>(title);

    const onEditMode = () => {
      setEditMode(true);
    };

    const offEditMode = () => {
      setEditMode(false);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      if (value) {
        changeTaskTitle(newValue);
      }
      setValue(newValue);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setEditMode(false);
      }
    };

    return editMode ? (
      <TextField
        className={styles.input}
        autoFocus
        onChange={onChangeHandler}
        onBlur={offEditMode}
        value={value}
        onKeyPress={onKeyPressHandler}
      />
    ) : (
      <span className={className} onDoubleClick={onEditMode}>
        {title}
      </span>
    );
  }
);
