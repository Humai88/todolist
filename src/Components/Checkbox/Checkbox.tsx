import Checkbox from "@material-ui/core/Checkbox";

import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";

// type DefaultInputPropsType = DetailedHTMLProps<
//   InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >;

// type CheckboxPropsType = DefaultInputPropsType & {
//   onChangeChecked?: (checked: boolean) => void;
//   spanClassName?: string;
// };

// export const Checkbox: React.FC<CheckboxPropsType> = ({
//   type,
//   onChange,
//   onChangeChecked,
//   className,
//   spanClassName,
//   children,
//   ...restProps
// }) => {
//   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
//     onChange && onChange(e);
//     onChangeChecked && onChangeChecked(e.currentTarget.checked);
//   };

//   const finalInputClassName = `${s.checkbox} ${className ? className : ""}`;

//   return (
//     <label>
//       <input
//         type={"checkbox"}
//         onChange={onChangeCallback}
//         className={finalInputClassName}
//         {...restProps}
//       />
//       {children && <span className={s.spanClassName}>{children}</span>}
//     </label>
//   );
// };

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckboxPropsType = DefaultInputPropsType & {
  checked: boolean;
  children: React.ReactNode;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckboxElement = ({ children }: CheckboxPropsType) => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <label>
      <Checkbox onChange={handleChange} checked={checked} />
      {children && <span>{children}</span>}
    </label>
  );
};
