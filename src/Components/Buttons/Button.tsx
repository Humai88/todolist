import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./Button.module.css";
import { filterValuesType } from "./../../App";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type propsType = DefaultButtonPropsType & {
  filter?: filterValuesType;
  red?: boolean;
};

export const Button: React.FC<propsType> = ({
  title,
  red,
  filter,
  className,
  ...restProps
}) => {
  const finalStyles = `${className && className} ${red ? s.red : s.default} ${
    filter === title ? s.activeFilter : ""
  }`;
  return (
    <>
      <button className={finalStyles} {...restProps} />
    </>
  );
};
