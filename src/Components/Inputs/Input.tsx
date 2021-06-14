import React, { ChangeEvent, KeyboardEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import s from "./Input.module.css";

type propsType = {
  callback: (title: string) => void;
};

export const Input: React.FC<propsType> = ({ callback }) => {
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
      <input
        className={error ? s.error : ""}
        value={newTaskTitle}
        onChange={onChangeHeandler}
        onKeyPress={onKeyPressHandler}
      />

      <button className={s.btn} onClick={onClickHeandler}>
        <FaPlus />
      </button>
      {error && <span className={error ? s.errorMessage : ""}>{error}</span>}
    </>
  );
};
