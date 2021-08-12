import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "Components/EditableSpan",
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => (
  <EditableSpan {...args} />
);

export const FirstEditableSpanExample = Template.bind({});
FirstEditableSpanExample.args = {
  title: "Title",
  changeTaskTitle: action("Title was changed"),
};
