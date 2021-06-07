import React from "react";
type propsType = {
  callback: () => void;
  title: string | Element;
};
export const Button: React.FC<propsType> = ({ callback, title }) => {
  const onClickHeandler = () => callback();
  return (
    <>
      <button onClick={onClickHeandler}>{title}</button>
    </>
  );
};
