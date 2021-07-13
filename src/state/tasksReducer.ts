import { TaskType } from "./../App";

export const tasksReducer = (state: TaskType[], action: any): TaskType[] => {
  switch (action.type) {
    case "ADD_TASK":
      return state;

    default:
      throw new Error("I dont understand this action type");
  }
};
