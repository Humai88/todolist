import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import styles from "./SuperCheckbox.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
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

  const finalInputClassName = `${styles.input} ${className ? className : ""}`;

  return (
    <label className={styles.label}>
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

export default SuperCheckbox;
