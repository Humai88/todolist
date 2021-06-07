import React, { ChangeEvent, KeyboardEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

type propsType = {
  callback: (title: string) => void;
};

export const Input: React.FC<propsType> = ({ callback }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onClickHeandler = () => {
    callback(newTaskTitle);
    setNewTaskTitle("");
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickHeandler();
    }
  };
  return (
    <>
      <input
        value={newTaskTitle}
        onChange={onChangeHeandler}
        onKeyPress={onKeyPressHandler}
      />

      <button onClick={onClickHeandler}>
        <FaPlus />
      </button>
    </>
  );
};
