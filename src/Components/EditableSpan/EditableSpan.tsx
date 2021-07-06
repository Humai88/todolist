import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

type PropsType = {
  title: string;
  changeTaskTitle: (title: string) => void;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      fontSize: "1.1rem",
      color: "#262c36",
      opacity: 0.6,
    },
  })
);

export const EditableSpan: React.FC<PropsType> = ({
  title,
  changeTaskTitle,
  className,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);
  const classes = useStyles();

  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      changeTaskTitle(value);
    }
    setValue(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditMode(false);
    }
  };
  return editMode ? (
    <TextField
      InputProps={{ className: classes.input }}
      autoFocus
      onChange={onChangeHandler}
      onBlur={offEditMode}
      value={value}
      onKeyPress={onKeyPressHandler}
    />
  ) : (
    <span className={className} onDoubleClick={onEditMode}>
      {title}
    </span>
  );
};
