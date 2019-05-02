import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab, InputGroup, FormControl, FormControlProps, Button, ListGroup } from 'react-bootstrap';

import { UserListItem, PublicListItem } from './TransformListItem';
import { TransformScript } from './domain';
import { selectScript, deleteScript } from './state';
import { User } from '../users/domain';
import { AppState } from '../app/state';

const style = {
  inputGroupStyle: {
    padding: '12px',
  },
};

type StateProps = {
  scripts: TransformScript[];
  selectedScript: TransformScript;
  user: User | undefined;
};

type DispatchProps = {
  onScriptClick: (script: TransformScript) => void;
  onDeleteClick: (script: TransformScript) => void;
};

type TransformListContainerProps = StateProps & DispatchProps;

const TransformListContainer = ({
  scripts,
  selectedScript,
  user,
  onScriptClick,
  onDeleteClick,
}: TransformListContainerProps) => {
  const getUserScripts = () => (user ? scripts.filter(s => s.userId === user.id) : []);
  const getPublicScripts = () => (user ? scripts.filter(s => s.userId !== user.id) : scripts);

  const [userScripts, setUserScripts] = React.useState(getUserScripts());
  const [publicScripts, setPublicScripts] = React.useState(getPublicScripts());
  const [userSearchText, setUserSearchText] = React.useState('');
  const [publicSearchText, setPublicSearchText] = React.useState('');

  const searchUserScripts = () => {
    if (!userSearchText) {
      setUserScripts(getUserScripts());
      return;
    }

    const regex = new RegExp(userSearchText, 'i');
    const newUserScripts = userScripts.filter(script => regex.test(script.name));
    setUserScripts(newUserScripts);
  };

  const searchPublicScripts = () => {
    if (!publicSearchText) {
      setPublicScripts(getPublicScripts());
      return;
    }

    const regex = new RegExp(publicSearchText, 'i');
    const newPublicScripts = publicScripts.filter(script => regex.test(script.name));
    setPublicScripts(newPublicScripts);
  };

  const renderSearch = (text: string, onTextChange: (text: string) => void, onSearchClick: () => void) => {
    return (
      <InputGroup style={style.inputGroupStyle}>
        <FormControl
          type="input"
          placeholder="Search..."
          value={text}
          onChange={(e: React.FormEvent<FormControlProps>) => onTextChange(e.currentTarget.value || '')}
        />
        <InputGroup.Append>
          <Button variant="primary" size="sm" onClick={onSearchClick}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };

  return (
    <Tabs id="scripts-tabs" defaultActiveKey="user">
      <Tab eventKey="user" title="My Scripts">
        {renderSearch(userSearchText, text => setUserSearchText(text), () => searchUserScripts())}

        <ListGroup as="ul">
          {userScripts.map(script => (
            <UserListItem
              script={script}
              isActive={selectedScript.id === script.id}
              onClick={() => onScriptClick(script)}
              onDeleteClick={() => onDeleteClick(script)}
            />
          ))}
        </ListGroup>
      </Tab>
      <Tab eventKey="public" title="Public Scripts">
        {renderSearch(publicSearchText, text => setPublicSearchText(text), () => searchPublicScripts())}

        <ListGroup as="ul">
          {publicScripts.map(script => (
            <PublicListItem
              script={script}
              isActive={selectedScript.id === script.id}
              onClick={() => onScriptClick(script)}
            />
          ))}
        </ListGroup>
      </Tab>
    </Tabs>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    scripts: state.transform.scripts,
    selectedScript: state.transform.selectedScript,
    user: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onScriptClick: bindActionCreators(selectScript, dispatch),
    onDeleteClick: bindActionCreators(deleteScript, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformListContainer);
