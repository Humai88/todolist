import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./EditableSpan.module.scss";
import { Input } from "./../Inputs/Input";
import { FaEdit } from "react-icons/fa";
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
    <Input
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
