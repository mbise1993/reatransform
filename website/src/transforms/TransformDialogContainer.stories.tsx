import React from 'react';
import { storiesOf } from '@storybook/react';

import TransformDialogContainer from './TransformDialogContainer';
import { RppData } from '../projects/domain/projectModel';
import { ProjectService } from '../projects/domain';
import { readTestResource } from '../test/utilBrowser';
import { AsyncTestProvider } from '../test/TestProvider';

const loadTestState = async (names: string[]) => {
  const rppPromises = names.map(async name => {
    return {
      name: name,
      rootElement: await ProjectService.rppToElement(readTestResource(name)),
    } as RppData;
  });

  return {
    transform: {
      transformedProjects: await Promise.all(rppPromises),
    },
  };
};

storiesOf('TransformDialog', module).add('with 1 transformed project', () => {
  const loadState = () => loadTestState(['OneEmptyTrack.rpp']);

  return (
    <AsyncTestProvider loadState={loadState}>
      <TransformDialogContainer />
    </AsyncTestProvider>
  );
});

storiesOf('TransformDialog', module).add('with multiple transformed project', () => {
  const loadState = () =>
    loadTestState(['EmptyProject.rpp', 'OneEmptyTrack.rpp', 'OneTrackWithMidiData.rpp', 'OneTrackWithOneVst.rpp']);

  return (
    <AsyncTestProvider loadState={loadState}>
      <TransformDialogContainer />
    </AsyncTestProvider>
  );
});
