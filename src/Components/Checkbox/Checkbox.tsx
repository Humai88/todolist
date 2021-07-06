import Checkbox from "@material-ui/core/Checkbox";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";

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
      <Checkbox color={"primary"} onChange={handleChange} checked={checked} />
      {children && <span>{children}</span>}
    </label>
  );
};
