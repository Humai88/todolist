import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./EditableSpan.module.scss";

type PropsType = {
  title: string;
  changeTaskTitle: (title: string) => void;
  className?: string;
};

export const EditableSpan: React.FC<PropsType> = ({
  title,
  changeTaskTitle,
  className,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      changeTaskTitle(value);
    }
    setValue(e.currentTarget.value);
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
};
