import React from "react";
import s from "./Button.module.css";
import { filterValuesType } from "./../../App";

type propsType = {
  callback: () => void;
  title: string | Object;
  filter?: filterValuesType;
};

export const Button: React.FC<propsType> = ({ callback, title, filter }) => {
  const onClickHeandler = () => callback();
  return (
    <>
      <button
        className={filter === title ? s.activeFilter : ""}
        onClick={onClickHeandler}
      >
        {title}
      </button>
    </>
  );
};
