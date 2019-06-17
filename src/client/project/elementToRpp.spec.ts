import { readTestResource } from '../test/util';
import elementToRpp from './elementToRpp';
import rppToElement from './rppToElement';

it('Can convert EmptyProject.rpp to object and back', async () => {
  const content = readTestResource('EmptyProject.rpp');
  const obj = await rppToElement(content);
  const rpp = await elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneEmptyTrack.rpp to object and back', async () => {
  const content = readTestResource('OneEmptyTrack.rpp');
  const obj = await rppToElement(content);
  const rpp = await elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithMidiData.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithMidiData.rpp');
  const obj = await rppToElement(content);
  const rpp = await elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithOneVst.rpp to object and back', async () => {
  const content = readTestResource('OneTrackWithOneVst.rpp');
  const obj = await rppToElement(content);
  const rpp = await elementToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});
