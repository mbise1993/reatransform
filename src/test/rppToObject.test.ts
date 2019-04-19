import { readTestResource } from './util';
import { rppToElement } from '../project/rppConverter';

it('can convert EmptyProject.rpp to object', async () => {
  const content = readTestResource('EmptyProject.rpp');
  const root = await rppToElement(content);

  validateReaperProject(root, 8);
});

it('can convert OneEmptyTrack.rpp to object', async () => {
  const content = readTestResource('OneEmptyTrack.rpp');
  const root = await rppToElement(content);

  validateReaperProject(root, 9);

  const track = getChildElements(root, 'TRACK')[0];
  validateTrack(track, 1);
});

it('can convert OneTrackWithMidiData.rpp to object', async () => {
  const content = readTestResource('OneTrackWithMidiData.rpp');
  const root = await rppToElement(content);

  validateReaperProject(root, 9);

  const track = getChildElements(root, 'TRACK')[0];
  validateTrack(track, 2);

  const item = getChildElements(track, 'ITEM')[0];
  validateMidiItem(item);
});

it('can convert OneTrackWithOneVst.rpp to object', async () => {
  const content = readTestResource('OneTrackWithOneVst.rpp');
  const root = await rppToElement(content);

  validateReaperProject(root, 9);

  const track = getChildElements(root, 'TRACK')[0];
  validateTrack(track, 1);

  const fxChain = getChildElements(track, 'FXCHAIN')[0];
  validateFxChain(fxChain, 1);
});

const validateReaperProject = (el: any, numChildElements: number) => {
  expect(el.name).toBe('REAPER_PROJECT');
  expect(el.attributes.length).toBe(3);
  expect(el.properties.length).toBeGreaterThan(0);
  expect(el.elements.length).toBe(numChildElements);
};

const validateTrack = (el: any, numChildElements: number) => {
  expect(el.name).toBe('TRACK');
  expect(el.attributes.length).toBe(1);
  expect(el.properties.length).toBeGreaterThan(0);
  expect(el.elements.length).toBe(numChildElements);
};

const validateMidiItem = (el: any) => {
  expect(el.name).toBe('ITEM');
  expect(el.attributes.length).toBe(0);
  expect(el.properties.length).toBeGreaterThan(0);
  expect(el.elements.length).toBe(1);

  const source = getChildElements(el, 'SOURCE')[0];
  expect(source.name).toBe('SOURCE');
  expect(source.attributes[0]).toBe('MIDI');
  expect(source.properties.length).toBeGreaterThan(0);
  expect(source.elements.length).toBe(0);
};

const validateFxChain = (el: any, numFx: number) => {
  expect(el.name).toBe('FXCHAIN');
  expect(el.attributes.length).toBe(0);
  expect(el.properties.length).toBeGreaterThan(0);
  expect(el.elements.length).toBe(numFx);
};

const getChildElements = (obj: any, name: string): any[] => {
  const children = obj.elements.filter((el: any) => el.name === name);
  expect(children.length).toBeGreaterThan(0);
  return children;
};
