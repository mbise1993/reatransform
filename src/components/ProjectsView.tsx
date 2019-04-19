import * as React from 'react';
import { PlusSquare, Square, CheckSquare, MinusSquare } from 'styled-icons/feather';

import { FlexSpan, Button, ListBox, Panel } from './base';
import { RppProject } from '../project/rppProject';

interface IProjectsViewProps {
  projects: RppProject[];
  selectedProject: RppProject;
  sourceProject: RppProject;
  onFileImport: (file: FileList | null) => void;
  onProjectClick: (project: RppProject) => void;
  onSetSourceClick: (project: RppProject) => void;
  onDeleteClick: (project: RppProject) => void;
}

export default ({
  projects,
  selectedProject,
  sourceProject,
  onFileImport,
  onProjectClick,
  onSetSourceClick,
  onDeleteClick
}: IProjectsViewProps) => {
  const renderHeaderRight = () => {
    let importFileInput: HTMLInputElement;

    return (
      <FlexSpan>
        <input
          ref={ref => (importFileInput = ref!)}
          multiple
          type="file"
          id="import-file-input"
          name="files[]"
          style={{ display: 'none' }}
          onChange={e => onFileImport(e.target.files)}
        />
        <Button tooltip="Import project" onClick={() => importFileInput!.click()}>
          <PlusSquare size={20} />
        </Button>
      </FlexSpan>
    );
  };

  const renderItemLeft = (project: RppProject) => {
    return <FlexSpan>{project.name}</FlexSpan>;
  };

  const renderItemRight = (project: RppProject) => {
    const padLeft = {
      paddingLeft: '4px'
    };

    const sourceIcon =
      project.id === sourceProject.id ? <CheckSquare size={20} /> : <Square size={20} />;

    const stopEvent = (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      handler: (project: RppProject) => void
    ) => {
      e.stopPropagation();
      handler(project);
    };

    return (
      <FlexSpan justifyContent="flex-end">
        <Button
          tooltip="Source project"
          style={padLeft}
          onClick={e => stopEvent(e, onSetSourceClick)}>
          {sourceIcon}
        </Button>
        <Button tooltip="Delete project" style={padLeft} onClick={e => stopEvent(e, onDeleteClick)}>
          <MinusSquare size={20} />
        </Button>
      </FlexSpan>
    );
  };

  return (
    <Panel
      headerBackgroundColor="lightskyblue"
      bodyBackgroundColor="transparent"
      borderColor="lightgray"
      flexBasis="250px"
      renderHeaderLeft={() => <FlexSpan>Projects</FlexSpan>}
      renderHeaderRight={() => renderHeaderRight()}>
      <ListBox
        items={projects}
        selectedItem={selectedProject}
        itemBackgroundColor="transparent"
        selectedItemBackgroundColor="lightgray"
        onItemClick={item => onProjectClick(item as RppProject)}
        getKey={item => (item as RppProject).id.toString()}
        renderItemLeft={item => renderItemLeft(item as RppProject)}
        renderItemRight={item => renderItemRight(item as RppProject)}
      />
    </Panel>
  );
};
