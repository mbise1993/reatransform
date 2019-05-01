import { readTestResource } from '../../test/util';
import ProjectService from './projectService';

it('Can convert EmptyProject.rpp to object and back', async () => {
  const content = readTestResource('EmptyProject.rpp');
  const obj = await ProjectService.rppToElement(content);
  const rpp = await ProjectService.elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneEmptyTrack.rpp to object and back', async () => {
  const content = readTestResource('OneEmptyTrack.rpp');
  const obj = await ProjectService.rppToElement(content);
  const rpp = await ProjectService.elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithMidiData.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithMidiData.rpp');
  const obj = await ProjectService.rppToElement(content);
  const rpp = await ProjectService.elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithOneVst.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithOneVst.rpp');
  const obj = await ProjectService.rppToElement(content);
  const rpp = await ProjectService.elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});
