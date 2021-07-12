import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import styles from "./Checkbox.module.scss";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

const Checkbox: React.FC<CheckboxPropsType> = ({
  type,
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(e.currentTarget.checked);
  };

  const finalInputClassName = `${styles.checkbox} ${
    className ? className : ""
  }`;

  return (
    <label>
      <input
        type={"checkbox"}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children && <span className={styles.spanClassName}>{children}</span>}
    </label>
  );
};

export default Checkbox;
