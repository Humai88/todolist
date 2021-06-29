import React, { ChangeEvent, KeyboardEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "../Inputs/Input";
import { Button } from "../Buttons/Button";
import styles from "./AddItem.module.scss";

type PropsType = {
  callback: (title: string) => void;
};
export const AddItem: React.FC<PropsType> = ({ callback }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onClickHandler = () => {
    if (newTaskTitle.trim() !== "") {
      callback(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Name is required!");
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.input}
        error={error}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />

      <Button title="Add" className={styles.btnAdd} onClick={onClickHandler}>
        <FaPlus />
      </Button>

      {error && (
        <span className={error ? styles.errorMessage : ""}>{error}</span>
      )}
    </div>
  );
};
