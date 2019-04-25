import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TestPanel from "../test/TestPanel";
import ProjectsPanel from "./ProjectsPanel";
import { ReaperProject } from "./reaperProject";

const width = "300px";
const height = "100%";

storiesOf("ProjectsPanel", module).add("with no projects", () => {
  return (
    <TestPanel width={width} height={height}>
      <ProjectsPanel
        id="projects-panel"
        projects={[]}
        selectedProject={null}
        sourceProject={null}
        onFileImport={action("file import clicked")}
        onProjectClick={action("project selected")}
        onSetSourceClick={action("set source clicked")}
        onDeleteClick={action("delete clicked")}
      />
    </TestPanel>
  );
});

storiesOf("ProjectsPanel", module).add("with 1 project", () => {
  const projects = [new ReaperProject("Project1.rpp", "")];

  return (
    <TestPanel width={width} height={height}>
      <ProjectsPanel
        id="projects-panel"
        projects={projects}
        selectedProject={projects[0]}
        sourceProject={projects[0]}
        onFileImport={action("file import clicked")}
        onProjectClick={action("project selected")}
        onSetSourceClick={action("set source clicked")}
        onDeleteClick={action("delete clicked")}
      />
    </TestPanel>
  );
});

storiesOf("ProjectsPanel", module).add("with multiple project", () => {
  const projects = [
    new ReaperProject("Project1.rpp", ""),
    new ReaperProject("Project2.rpp", ""),
    new ReaperProject("Project3.rpp", ""),
    new ReaperProject("Project4.rpp", ""),
    new ReaperProject("Project5.rpp", ""),
  ];

  return (
    <TestPanel width="300px" height="600px">
      <ProjectsPanel
        id="projects-panel"
        projects={projects}
        selectedProject={projects[0]}
        sourceProject={projects[0]}
        onFileImport={action("file import clicked")}
        onProjectClick={action("project selected")}
        onSetSourceClick={action("set source clicked")}
        onDeleteClick={action("delete clicked")}
      />
    </TestPanel>
  );
});
