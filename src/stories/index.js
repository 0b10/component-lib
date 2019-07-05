import { configure } from "@storybook/react";

const req = require.context("../", true, /^.+\.stories\.jsx?$/);
const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
