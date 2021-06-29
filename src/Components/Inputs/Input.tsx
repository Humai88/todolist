import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";

import styles from "./Input.module.scss";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type PropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string | null;
  spanClassName?: string;
  callback?: (title: string) => void;
};

export const Input: React.FC<PropsType> = ({
  type,
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  callback,
  className,
  spanClassName,
  error,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);
    onEnter && e.key === "Enter" && onEnter();
  };
  const finalInputClassName = `${
    error ? styles.errorInput : styles.superInput
  } ${className ? className : ""}`;

  return (
    <>
      <input
        type={"text"}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
    </>
  );
};
