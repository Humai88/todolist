import React from "react";
import styles from "./EditableSpan.module.scss";
type PropsType = {
  title?: string;
};

export const EditableSpan: React.FC<PropsType> = ({ title }) => {
  return <span>{title}</span>;
};
