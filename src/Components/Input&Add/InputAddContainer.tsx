import React, { ChangeEvent, KeyboardEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "./../Inputs/Input";
import { Button } from "./../Buttons/Button";
import s from "./InputAddContainer.module.css";

type PropsType = {
  callback: (title: string) => void;
};
export const InputAddContainer: React.FC<PropsType> = ({ callback }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onClickHeandler = () => {
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
      onClickHeandler();
    }
  };

  return (
    <>
      <Input
        className={s.input}
        error={error}
        value={newTaskTitle}
        onChange={onChangeHeandler}
        onKeyPress={onKeyPressHandler}
      />

      <Button title="Add" className={s.btnAdd} onClick={onClickHeandler}>
        <FaPlus />
      </Button>
      {error && <span className={error ? s.errorMessage : ""}>{error}</span>}
    </>
  );
};
