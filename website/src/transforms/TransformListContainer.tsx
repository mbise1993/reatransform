import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { TransformScript } from './domain';
import { getAllScripts, selectScript, deleteScript } from './state';
import { User } from '../users/domain';
import { AppState } from '../app/state';

type StateProps = {
  scripts: TransformScript[];
  user: User | undefined;
};

type DispatchProps = {
  onRefreshClick: () => void;
  onScriptClick: (script: TransformScript) => void;
  onDeleteClick: (script: TransformScript) => void;
};

type TransformListContainerProps = StateProps & DispatchProps;

const TransformListContainer = ({
  scripts,
  user,
  onRefreshClick,
  onScriptClick,
  onDeleteClick,
}: TransformListContainerProps) => {
  const [userScripts, setUserScripts] = React.useState(user ? scripts.filter(s => s.userId === user.id) : []);
  const [publicScripts, setPublicScripts] = React.useState(user ? scripts.filter(s => s.userId !== user.id) : scripts);

  return (
    <div>
      <span>Transform container</span>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    scripts: state.transform.scripts,
    user: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onRefreshClick: bindActionCreators(getAllScripts, dispatch),
    onScriptClick: bindActionCreators(selectScript, dispatch),
    onDeleteClick: bindActionCreators(deleteScript, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformListContainer);
