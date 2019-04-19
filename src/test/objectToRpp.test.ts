import { readTestResource } from './util';
import { rppToObject, objectToRpp } from '../project/rppConverter';

it('Can convert EmptyProject.rpp to object and back', async () => {
  const content = readTestResource('EmptyProject.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneEmptyTrack.rpp to object and back', async () => {
  const content = readTestResource('OneEmptyTrack.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithMidiData.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithMidiData.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithOneVst.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithOneVst.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});
