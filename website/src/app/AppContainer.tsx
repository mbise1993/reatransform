import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CardGroup } from 'react-bootstrap';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import ProjectContainer from '../projects/ProjectContainer';
import TransformListContainer from '../transforms/TransformListContainer';
import TransformScriptEditor from '../transforms/TransformScriptEditor';
import TransformDialogContainer from '../transforms/TransformDialogContainer';
import { Project, RppData } from '../projects/domain';
import { TransformScript, TransformService } from '../transforms/domain';
import { User } from '../users/domain';
import { selectScript, modifyScriptText, runTransform } from '../transforms/state';
import { logout } from '../users/state';
import { AppState } from './state';

const builtInScripts = TransformService.getBuiltInScripts();

const styles: any = {
  showTransformList: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    height: '100%',
    width: '20%',
    zIndex: 99,
  },
};

styles.hideTransformList = {
  ...styles.showTransformList,
  display: 'none',
};

type StateProps = {
  user: User | undefined;
  projects: Project[];
  sourceProject: Project | undefined;
  selectedScript: TransformScript | undefined;
  scriptText: string;
  isTransformInProgress: boolean;
};

type DispatchProps = {
  onLogoutClick: () => void;
  onScriptChange: (script: TransformScript) => void;
  onScriptTextChange: (scriptText: string) => void;
  onTransformClick: (scriptText: string, sourceProject: RppData, otherProjects: RppData[]) => void;
};

type AppProps = StateProps & DispatchProps;

const AppContainer = ({
  user,
  projects,
  sourceProject,
  selectedScript,
  scriptText,
  isTransformInProgress,
  onLogoutClick,
  onScriptChange,
  onScriptTextChange,
  onTransformClick,
}: AppProps) => {
  const [showTransformList, setShowTransformList] = React.useState(false);

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
      <PageHeader
        id="app-header"
        user={user}
        canRunTransform={projects.length > 0}
        isTransformRunning={isTransformInProgress}
        onLogoutClick={onLogoutClick}
        onRunTransformClick={handleTransformClick}
        onShowTransformsClick={() => setShowTransformList(!showTransformList)}
      />

      <div id="app-content">
        <CardGroup className="h-100">
          <ProjectContainer />

          <TransformScriptEditor
            id="transform-script-panel"
            script={selectedScript!}
            scriptText={scriptText}
            allScripts={builtInScripts}
            onScriptChange={onScriptChange}
            onScriptTextChange={onScriptTextChange}
          />
        </CardGroup>

        <div id="transform-list-panel" style={showTransformList ? styles.showTransformList : styles.hideTransformList}>
          <TransformListContainer />
        </div>
      </div>

      <PageFooter id="app-footer" />

      <TransformDialogContainer />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    user: state.user.loggedInUser,
    projects: state.project.projects,
    sourceProject: state.project.sourceProject,
    selectedScript: state.transform.selectedScript,
    scriptText: state.transform.scriptText,
    isTransformInProgress: state.transform.isInProgress,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onLogoutClick: bindActionCreators(logout, dispatch),
    onScriptChange: bindActionCreators(selectScript, dispatch),
    onScriptTextChange: bindActionCreators(modifyScriptText, dispatch),
    onTransformClick: bindActionCreators(runTransform, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
