import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CardGroup } from 'react-bootstrap';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import ProjectContainer from '../projects/ProjectContainer';
import TransformScriptEditor from '../transforms/TransformScriptEditor';
import TransformDialogContainer from '../transforms/TransformDialogContainer';
import { Project, IRppData } from '../projects/domain';
import { ITransformScript, TransformService } from '../transforms/domain';
import { selectScript, modifyScriptText, runTransform } from '../transforms/state';
import { AppState } from './state';

const builtInScripts = TransformService.getBuiltInScripts();

type StateProps = {
  projects: Project[];
  sourceProject: Project | undefined;
  selectedScript: ITransformScript | undefined;
  scriptText: string;
  isTransformInProgress: boolean;
};

type DispatchProps = {
  onScriptChange: (script: ITransformScript) => void;
  onScriptTextChange: (scriptText: string) => void;
  onTransformClick: (scriptText: string, sourceProject: IRppData, otherProjects: IRppData[]) => void;
};

type AppProps = StateProps & DispatchProps;

const AppContainer = ({
  projects,
  sourceProject,
  selectedScript,
  scriptText,
  isTransformInProgress,
  onScriptChange,
  onScriptTextChange,
  onTransformClick,
}: AppProps) => {
  const handleTransformClick = async () => {
    if (!sourceProject) {
      return;
    }

    const source = await sourceProject.getRppData();
    const othersPromise = projects.filter(proj => proj.id !== sourceProject.id).map(proj => proj.getRppData());
    const others = await Promise.all(othersPromise);
    onTransformClick(scriptText, source, others);
  };

  return (
    <div id="app-container">
      <PageHeader id="app-header" />

      <div id="app-content">
        <CardGroup className="h-100">
          <ProjectContainer />

          <TransformScriptEditor
            id="transform-script-panel"
            script={selectedScript!}
            scriptText={scriptText}
            allScripts={builtInScripts}
            canRun={projects.length > 0}
            isRunning={isTransformInProgress}
            onScriptChange={s => onScriptChange(s)}
            onScriptTextChange={t => onScriptTextChange(t)}
            onTransformClick={() => handleTransformClick()}
          />
        </CardGroup>
      </div>

      <PageFooter id="app-footer" />

      <TransformDialogContainer />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    projects: state.project.projects,
    sourceProject: state.project.sourceProject,
    selectedScript: state.transform.selectedScript,
    scriptText: state.transform.scriptText,
    isTransformInProgress: state.transform.isInProgress,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onScriptChange: bindActionCreators(selectScript, dispatch),
    onScriptTextChange: bindActionCreators(modifyScriptText, dispatch),
    onTransformClick: bindActionCreators(runTransform, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
