import { configure } from "@storybook/react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../src/styles.css";

const req = require.context("../src", true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
