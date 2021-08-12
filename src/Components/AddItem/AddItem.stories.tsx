import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItem } from "./AddItem";

export default {
  title: "Components/AddItem",
  component: AddItem,
} as ComponentMeta<typeof AddItem>;

const Template: ComponentStory<typeof AddItem> = (args) => (
  <AddItem {...args} />
);

export const FirstAddItemExample = Template.bind({});
FirstAddItemExample.args = {
  callback: action("Hello"),
};
