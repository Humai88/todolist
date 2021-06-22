import React, { ChangeEvent, KeyboardEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "./../Inputs/Input";
import { Button } from "./../Buttons/Button";
import s from "./InputAddContainer.module.css";

type PropsType = {
  callback: (title: string, todoListId: string) => void;
  id: string;
};
export const InputAddContainer: React.FC<PropsType> = ({ callback, id }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onClickHandler = () => {
    if (newTaskTitle.trim() !== "") {
      callback(newTaskTitle, id);
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
    <div className={s.wrapper}>
      <Input
        className={s.input}
        error={error}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />

      <Button title="Add" className={s.btnAdd} onClick={onClickHandler}>
        <FaPlus />
      </Button>

      {error && <span className={error ? s.errorMessage : ""}>{error}</span>}
    </div>
  );
};
