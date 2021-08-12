import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import App from "./App";
import { ReduxStoreProviderDecorator } from "./state/ReduxStoreProviderDecorator";

export default {
  title: "Components/App",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const FirstAppExample = Template.bind({});
FirstAppExample.args = {};
