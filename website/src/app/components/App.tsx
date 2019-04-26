import * as React from 'react';
import { CardGroup } from 'react-bootstrap';

import HeaderPanel from './HeaderPanel';
import FooterPanel from './FooterPanel';
import ProjectsPanel from '../../projects/components/ProjectsPanel';
import ProjectJsonPanel from '../../projects/components/ProjectJsonPanel';
import TransformScriptPanel from '../../transforms/components/TransformScriptPanel';
import TransformDialog from '../../transforms/components/TransformDialog';
import { ReaperProject, IRppData, importProjects } from '../../projects/models/reaperProject';
import { allScripts, ITransformScript, runTransformScript } from '../../transforms/models/transformScript';

export default () => {
  const [projects, setProjects] = React.useState<ReaperProject[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<ReaperProject | null>(null);
  const [sourceProject, setSourceProject] = React.useState<ReaperProject | null>(null);
  const [script, setScript] = React.useState(allScripts[0]);
  const [scriptText, setScriptText] = React.useState(allScripts[0].script);
  const [projectJson, setProjectJson] = React.useState('');
  const [isRunning, setRunning] = React.useState(false);
  const [transformedRpps, setTransformedRpps] = React.useState<IRppData[]>([]);

  const handleTransformClick = async () => {
    if (sourceProject === null) {
      return;
    }

    setRunning(true);

    try {
      const source = await sourceProject.getData();
      const othersPromise = projects.filter(proj => proj.id !== sourceProject.id).map(proj => proj.getData());

      const others = await Promise.all(othersPromise);
      const transformedRpps = await runTransformScript(scriptText, source, others);
      setTransformedRpps(transformedRpps);

      setRunning(false);
    } catch (e) {
      alert(`Error: ${e.message}`);
      setTransformedRpps([]);
      setRunning(false);
    }
  };

  const handleTransformDialogClose = () => setTransformedRpps([]);

  const handleFileImport = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    const importedProjects = await importProjects(files);
    if (!importedProjects) {
      return;
    }

    if (!selectedProject) {
      updateSelectedProject(importedProjects[0]);
    }

    if (!sourceProject) {
      setSourceProject(importedProjects[0]);
    }

    setProjects([...projects, ...importedProjects]);
  };

  const handleSetSourceClick = (project: ReaperProject) => {
    setSourceProject(project);
  };

  const handleDeleteClick = (project: ReaperProject) => {
    const index = projects.findIndex(proj => proj.id === project.id);
    const newProjects = projects.filter(proj => proj.id !== project.id);
    setProjects(newProjects);

    const newIndex = index < newProjects.length ? index : newProjects.length - 1;
    if (newIndex < 0) {
      updateSelectedProject(null);
      setSourceProject(null);
      return;
    }

    if (selectedProject && project.id === selectedProject.id) {
      updateSelectedProject(newProjects[newIndex]);
    }

    if (sourceProject && project.id === sourceProject.id) {
      setSourceProject(newProjects[newIndex]);
    }
  };

  const handleScriptChange = (selectedScript: ITransformScript) => {
    setScript(selectedScript);
    setScriptText(selectedScript.script);
  };

  const handleScriptTextChange = (text: string) => {
    setScriptText(text);
  };

  const updateSelectedProject = (project: ReaperProject | null) => {
    setSelectedProject(project);

    if (project) {
      project
        .getData()
        .then(obj => setProjectJson(JSON.stringify(obj, null, 2)))
        .catch(error => console.log((error as Error).message));
    } else {
      setProjectJson('');
    }
  };

  const title = selectedProject ? `JSON for ${selectedProject.name}` : 'No Project Selected';

  return (
    <div id="app-container">
      <HeaderPanel id="app-header" />

      <div id="app-content">
        <CardGroup className="h-100">
          <ProjectsPanel
            id="projects-panel"
            projects={projects}
            selectedProject={selectedProject}
            sourceProject={sourceProject}
            onFileImport={files => handleFileImport(files)}
            onProjectClick={project => updateSelectedProject(project)}
            onSetSourceClick={project => handleSetSourceClick(project)}
            onDeleteClick={project => handleDeleteClick(project)}
          />

          <ProjectJsonPanel id="project-json-panel" title={title} json={projectJson} />

          <TransformScriptPanel
            id="transform-script-panel"
            script={script}
            scriptText={scriptText}
            allScripts={allScripts}
            canRun={projects.length > 0}
            isRunning={isRunning}
            onScriptChange={s => handleScriptChange(s)}
            onScriptTextChange={t => handleScriptTextChange(t)}
            onTransformClick={() => handleTransformClick()}
          />
        </CardGroup>
      </div>

      <FooterPanel id="app-footer" />

      <TransformDialog
        show={transformedRpps.length > 0}
        transformedRpps={transformedRpps}
        onClose={() => handleTransformDialogClose()}
      />
    </div>
  );
};
