import React, { ChangeEvent, useEffect, useState } from "react";
import { todolistsAPI } from "./todolistsAPI";

export default {
  title: "API",
};

//! Todolists

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsAPI.getTodolists().then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<any>("");
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addTodolist = () => {
    todolistsAPI.postTodolist(title).then((resp) => setState(resp.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={changeTitle}
          value={title}
        />
        <button onClick={addTodolist}>ADD TITLE</button>
      </div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");

  const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const deleteTodolist = () => {
    todolistsAPI.deleteTodolist(todolistId).then((resp) => setState(resp.data));
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="TodolistId"
          onChange={changeTololistId}
          value={todolistId}
        />
        <button onClick={deleteTodolist}>DELETE TODOLIST</button>
      </div>
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");
  const [title, setTitle] = useState<any>("");

  const updateTodolistTitle = () => {
    todolistsAPI
      .updateTodolist(todolistId, title)
      .then((resp) => setState(resp.data));
  };

  const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="TodolistId"
          onChange={changeTololistId}
          value={todolistId}
        />
        <input
          type="text"
          placeholder="Title"
          onChange={changeTitle}
          value={title}
        />
        <button onClick={updateTodolistTitle}>UPDATE TITLE</button>
      </div>
    </div>
  );
};

//! Tasks
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");

  const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const getTasks = () => {
    todolistsAPI.getTasks(todolistId).then((resp) => setState(resp.data));
  };
  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="TodolistId"
          onChange={changeTololistId}
          value={todolistId}
        />

        <button onClick={getTasks}>GET TASKS</button>
      </div>
    </div>
  );
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");
  const [title, setTitle] = useState<any>("");

  const addTask = () => {
    todolistsAPI
      .postTask(todolistId, title)
      .then((resp) => setState(resp.data));
  };
  const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };

  const addTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="TodolistId"
          onChange={changeTololistId}
          value={todolistId}
        />
        <input
          type="text"
          placeholder="Title"
          onChange={addTaskTitle}
          value={title}
        />
        <button onClick={addTask}>ADD TASK</button>
      </div>
    </div>
  );
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");
  const [taskId, setTaskId] = useState<any>("");

  const deleteTask = () => {
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((resp) => setState(resp.data));
  };
  const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="TodolistId"
          onChange={changeTololistId}
          value={todolistId}
        />
        <input
          type="text"
          placeholder="TasktId"
          onChange={changeTaskId}
          value={taskId}
        />
        <button onClick={deleteTask}>DELETE TASK</button>
      </div>
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");
  const [taskId, setTaskId] = useState<any>("");
  const [values, setValues] = useState<any>({
    todolistId: "",
    taskId: "",
    title: "",
    descr: "",
    status: 0,
    priority: 0,
    startDate: "2021-08-19T17:28:37.457",
    deadline: "2021-08-19T17:28:39.457",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const newValue = value;
    setValues({
      ...values,
      [name]: newValue,
    });
  };
  // const changeTololistId = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTodolistId(e.currentTarget.value);
  // };
  // const changeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTaskId(e.currentTarget.value);
  // };

  const updateTask = () => {
    todolistsAPI
      .updateTask(values.todolistId, values.taskId, {
        title: values.title,
        description: values.descr,
        status: values.status,
        priority: values.priority,
        startDate: values.startDate,
        deadline: values.deadline,
      })
      .then((resp) => setState(resp.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          name="todolistId"
          placeholder="TodolistId"
          onChange={handleInputChange}
          value={values.todolistId}
        />
        <input
          name="taskId"
          type="text"
          placeholder="TasktId"
          onChange={handleInputChange}
          value={values.taskId}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
          value={values.title}
        />
        <input
          placeholder="Description"
          type="text"
          name="descr"
          onChange={handleInputChange}
          value={values.descr}
        />
        <input
          placeholder="Status"
          type="text"
          name="status"
          onChange={handleInputChange}
          value={values.status}
        />
        <input
          placeholder="Priority"
          type="text"
          name="priority"
          onChange={handleInputChange}
          value={values.priority}
        />
        <input
          placeholder="Start Date"
          type="text"
          name="startDate"
          onChange={handleInputChange}
          value={values.startDate}
        />
        <input
          placeholder="Deadline"
          type="text"
          name="deadline"
          onChange={handleInputChange}
          value={values.deadline}
        />
        <button onClick={updateTask}>UPDATE TASK</button>
      </div>
    </div>
  );
};
