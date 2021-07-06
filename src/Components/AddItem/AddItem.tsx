import React, { ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./../Buttons/Button";
import { useState } from "react";
import { Input } from "../Inputs/Input";
import { FaPlus } from "react-icons/fa";
import styles from "./AddItem.module.scss";
import { IconButton } from "@material-ui/core";

type PropsType = {
  callback: (title: string) => void;
};
export const AddItem: React.FC<PropsType> = ({ callback }) => {
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
    setError(false);
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        error={error}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />

      <button title="Add" className={styles.btnAdd} onClick={onClickHandler}>
        <FaPlus />
      </button>

      {error && (
        <span className={error ? styles.errorMessage : ""}>
          "Title is required!"
        </span>
      )}
    </div>
  );
};
