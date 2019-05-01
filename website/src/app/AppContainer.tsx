import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CardGroup } from 'react-bootstrap';

import HeaderPanel from './HeaderPanel';
import FooterPanel from './FooterPanel';
import ProjectContainer from '../projects/ProjectContainer';
import TransformScriptPanel from '../transforms/TransformScriptPanel';
import TransformDialog from '../transforms/TransformDialog';
import { ReaperProject, IRppData } from '../projects/domain/reaperProject';
import { allScripts, ITransformScript } from '../transforms/domain/transformScript';
import { selectScript, modifyScriptText, runTransform } from '../transforms/state';
import { AppState } from './state';

type StateProps = {
  projects: ReaperProject[];
  sourceProject: ReaperProject | undefined;
  selectedScript: ITransformScript | undefined;
  scriptText: string;
  isTransformInProgress: boolean;
};

type DispatchProps = {
  onScriptChange: (scriptId: string) => void;
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

    const source = await sourceProject.getData();
    const othersPromise = projects.filter(proj => proj.id !== sourceProject.id).map(proj => proj.getData());
    const others = await Promise.all(othersPromise);
    onTransformClick(scriptText, source, others);
  };

  return (
    <div id="app-container">
      <HeaderPanel id="app-header" />

      <div id="app-content">
        <CardGroup className="h-100">
          <ProjectContainer />

          <TransformScriptPanel
            id="transform-script-panel"
            script={selectedScript!}
            scriptText={scriptText}
            allScripts={allScripts}
            canRun={projects.length > 0}
            isRunning={isTransformInProgress}
            onScriptChange={s => onScriptChange(s.id!)}
            onScriptTextChange={t => onScriptTextChange(t)}
            onTransformClick={() => handleTransformClick()}
          />
        </CardGroup>
      </div>

      <FooterPanel id="app-footer" />

      <TransformDialog />
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
