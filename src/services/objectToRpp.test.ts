import { rppToObject, objectToRpp } from './rppConverter';

it('Can convert EmptyProject.rpp to object and back', async () => {
  const content = require('../../testResources/EmptyProject.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneEmptyTrack.rpp to object and back', async () => {
  const content = require('../../testResources/OneEmptyTrack.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithMidiData.rpp to object and back', async () => {
  const content = require('../../testResources/OneTrackWithMidiData.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});

it('Can convert OneTrackWithOneVst.rpp to object and back', async () => {
  const content = require('../../testResources/OneTrackWithOneVst.rpp');
  const obj = await rppToObject(content);
  const rpp = await objectToRpp(obj);

  expect(rpp.localeCompare(content)).toBeTruthy();
});
