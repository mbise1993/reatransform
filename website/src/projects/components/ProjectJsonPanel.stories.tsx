import React from 'react';
import { storiesOf } from '@storybook/react';

import TestPanel from '../../test/TestPanel';
import ProjectJsonPanel from './ProjectJsonPanel';
import { IRppData } from '../domain/reaperProject';
import rppToElement from '../domain/rppToElement';
import { readTestResource } from '../../test/utilBrowser';
import AsyncLoader from '../../test/AsyncLoader';

const loadTestData = async () => {
  const name = 'EmptyProject.rpp';
  const rppData = {
    name: name,
    rootElement: await rppToElement(readTestResource(name)),
  } as IRppData;

  return JSON.stringify(rppData);
};

const width = '400px';
const height = '100%';

storiesOf('ProjectJsonPanel', module).add('with no text', () => {
  return (
    <TestPanel width={width} height={height}>
      <ProjectJsonPanel id="project-json-panel" title="No JSON" json="" />
    </TestPanel>
  );
});

storiesOf('ProjectJsonPanel', module).add('with JSON text', () => {
  return (
    <TestPanel width={width} height={height}>
      <AsyncLoader loadData={loadTestData}>
        {data => <ProjectJsonPanel id="project-json-panel" title="With JSON" json={data} />}
      </AsyncLoader>
    </TestPanel>
  );
});
