import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";

export default {
  title: "Components/Task",
  component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

// export const FirstTaskExample = Template.bind({});
// FirstTaskExample.args = {
//   changeTaskTitle: action("Task title was changed"),
//   removeTask: action("Task was removed"),
//   checkboxChange: action("Checkbox was changed"),
//   task: {
//     id: "1",
//     title: "Buy",
//     status: ,
//   },
//   todolistId: "todolistId1",
// };
// export const SecondTaskExample = Template.bind({});
// SecondTaskExample.args = {
//   changeTaskTitle: action("Task title was changed"),
//   removeTask: action("Task was removed"),
//   checkboxChange: action("Checkbox was changed"),
//   task: {
//     id: "2",
//     title: "Read",
//     isDone: false,
//   },
//   todolistId: "todolistId2",
// };
