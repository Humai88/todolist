import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistsAPI } from "./todolistsAPI";

export default {
  title: "API",
};

const settings = {
  withCredentials: true,
  headers: {
    "api-key": "b108fd33-d977-4add-bda9-9da2037bdf7a",
  },
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
  useEffect(() => {
    todolistsAPI.postTodolist("Buy Books").then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  let id = "0c016e61-01d4-433c-887f-0430d2f6aa18";
  useEffect(() => {
    todolistsAPI.deleteTodolist(id).then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  let id = "71c1ecac-651d-4b61-9c2e-fcd7cccf9516";
  useEffect(() => {
    todolistsAPI
      .updateTodolist(id, "JAVASCRIPT")
      .then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

//! Tasks
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  let id = "71c1ecac-651d-4b61-9c2e-fcd7cccf9516";
  useEffect(() => {
    todolistsAPI.getTasks(id).then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  let id = "71c1ecac-651d-4b61-9c2e-fcd7cccf9516";
  useEffect(() => {
    todolistsAPI.postTask(id, "Buy Apple").then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  let id = "71c1ecac-651d-4b61-9c2e-fcd7cccf9516";
  let taskId = "6f0d17e2-1197-4979-95c0-8351af7bb3f1";
  useEffect(() => {
    todolistsAPI.deleteTask(id, taskId).then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  let id = "71c1ecac-651d-4b61-9c2e-fcd7cccf9516";
  let taskId = "cc455669-8966-4068-a4e4-b8bb1bff945f";
  useEffect(() => {
    todolistsAPI
      .updateTask(
        id,
        taskId,
        "Buy Food",
        "Decsr",
        true,
        55,
        9,
        "2021-08-19T17:28:37.457",
        "2021-08-19T17:28:39.457"
      )
      .then((resp) => setState(resp.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
