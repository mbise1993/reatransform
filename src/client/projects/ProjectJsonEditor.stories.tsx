import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../test/TestPanel';
import ProjectJsonEditor from './ProjectJsonEditor';
import { RppData } from './domain';
import { ProjectService } from './domain';
import { readTestResource } from '../test/utilBrowser';
import AsyncLoader from '../test/AsyncLoader';

const loadTestData = async () => {
  const name = 'EmptyProject.rpp';
  const rppData = {
    name: name,
    rootElement: await ProjectService.rppToElement(readTestResource(name)),
  } as RppData;

  return JSON.stringify(rppData);
};

const width = '400px';
const height = '100%';

storiesOf('ProjectJsonPanel', module).add('with no text', () => {
  return (
    <TestPanel width={width} height={height}>
      <ProjectJsonEditor id="project-json-panel" title="No JSON" json="" />
    </TestPanel>
  );
});

storiesOf('ProjectJsonPanel', module).add('with JSON text', () => {
  return (
    <TestPanel width={width} height={height}>
      <AsyncLoader loadData={loadTestData}>
        {data => <ProjectJsonEditor id="project-json-panel" title="With JSON" json={data} />}
      </AsyncLoader>
    </TestPanel>
  );
});
