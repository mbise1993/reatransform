import { readTestResource } from './util';
import { adjustTempo } from '../transform/transformFunctions';
import { rppToObject } from '../project/rppConverter';

it('adjusts the tempo of a single project', () => {
  validateAdjustTempo([
    {
      fileName: 'EmptyProject.rpp',
      originalTempo: 120
    }
  ]);
});

it('adjusts the tempos of all projects', () => {
  validateAdjustTempo([
    {
      fileName: 'EmptyProject.rpp',
      originalTempo: 120
    },
    {
      fileName: 'OneTrackWithMidiData.rpp',
      originalTempo: 120
    },
    {
      fileName: 'OneTrackWithOneVst.rpp',
      originalTempo: 120
    }
  ]);
});

type TempoTestData = {
  fileName: string;
  originalTempo: number;
};

const validateAdjustTempo = async (testData: TempoTestData[]) => {
  const projectPromises = testData.map(async item => {
    const content = readTestResource(`${item.fileName}`);
    const data = await rppToObject(content);
    return {
      name: item.fileName,
      data: data
    };
  });

  const projects = await Promise.all(projectPromises);
  adjustTempo(projects);

  for (const project of projects) {
    const testDatum: any = testData.find(item => item.fileName === project.name);
    let tempoProp = getProperty(project.data, 'TEMPO');
    expect(tempoProp.attributes[0]).toBe(testDatum.originalTempo * 1.5);
  }
};

const getProperty = (el: any, name: string) => {
  const prop = el.properties.find((p: any) => p.name === name);
  expect(prop).toBeDefined();
  return prop;
};
