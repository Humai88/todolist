import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FilterValuesType } from "../../state/todolistsReducer";
import styles from "./Button.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type propsType = DefaultButtonPropsType & {
  filter?: FilterValuesType;
  red?: boolean;
};

export const Button: React.FC<propsType> = ({
  title,
  red,
  filter,
  className,
  ...restProps
}) => {
  const finalStyles = `${className && className} ${
    red ? styles.red + " " + styles.default : styles.default
  } ${filter === title ? styles.activeFilter : ""}`;
  return (
    <>
      <button className={finalStyles} {...restProps} />
    </>
  );
};
