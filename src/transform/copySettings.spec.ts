import { readTestResource } from "../test/util";
import { copySettings } from "./copySettings";
import rppToElement from "../project/rppToElement";
import { IRppData, IRppElement } from "../project/reaperProject";
import console = require("console");

it("copies the settings to a single project", async () => {
  await validateCopySettings({
    sourceFileName: "OneTrackWithOneVst.rpp",
    otherFileNames: ["OneTrackWithMidiData.rpp"],
  });
});

it("copies the settings to multiple projects", async () => {
  await validateCopySettings({
    sourceFileName: "OneTrackWithOneVst.rpp",
    otherFileNames: ["OneTrackWithMidiData.rpp"],
  });
});

type CopySettingsTestData = {
  sourceFileName: string;
  otherFileNames: string[];
};

const validateCopySettings = async (testData: CopySettingsTestData) => {
  const sourceContent = readTestResource(testData.sourceFileName);
  const sourceProject = {
    name: testData.sourceFileName,
    rootElement: await rppToElement(sourceContent),
  } as IRppData;

  const otherProjectPromises = testData.otherFileNames.map(async fileName => {
    const content = readTestResource(fileName);
    return {
      name: fileName,
      rootElement: await rppToElement(content),
    } as IRppData;
  });

  const otherProjects = await Promise.all(otherProjectPromises);
  copySettings(sourceProject, otherProjects);

  validateMasterSettings(sourceProject, otherProjects);
  validateTrackSettings(sourceProject, otherProjects);
};

const validateMasterSettings = (source: IRppData, others: IRppData[]) => {
  const sourceRoot = source.rootElement;
  const otherRoots = others.map(proj => proj.rootElement);
  validateProperty(sourceRoot, otherRoots, "MASTERMUTESOLO");
  validateProperty(sourceRoot, otherRoots, "MASTER_VOLUME");
  validateProperty(sourceRoot, otherRoots, "MASTER_FX");
};

const validateTrackSettings = (source: IRppData, others: IRppData[]) => {
  source.rootElement.elements
    .filter(el => el.name === "TRACK")
    .forEach(sourceTrack => {
      const otherTracks = others
        .map(proj => proj.rootElement.elements)
        .reduce((all, current) => [...all, ...current])
        .filter(el => areTracksSame(sourceTrack, el));

      validateProperty(sourceTrack, otherTracks, "VOLPAN");
      validateProperty(sourceTrack, otherTracks, "MUTESOLO");
      validateProperty(sourceTrack, otherTracks, "IPHASE");
      validateProperty(sourceTrack, otherTracks, "FX");
      validateProperty(sourceTrack, otherTracks, "MAINSEND");
      validateElement(sourceTrack, otherTracks, "FXCHAIN");
    });
};

const validateProperty = (source: IRppElement, others: IRppElement[], propName: string) => {
  const sourceProp = source.properties.find(prop => prop.name === propName);
  for (const other of others) {
    const otherProp = other.properties.find(prop => prop.name === propName);
    expect(JSON.stringify(otherProp)).toBe(JSON.stringify(sourceProp));
  }
};

const validateElement = (source: IRppElement, others: IRppElement[], elementName: string) => {
  const sourceEl = source.elements.find(el => el.name === elementName);
  for (const other of others) {
    const otherEl = other.elements.find(el => el.name === elementName);
    expect(JSON.stringify(otherEl)).toBe(JSON.stringify(sourceEl));
  }
};

const areTracksSame = (sourceTrack: IRppElement, otherTrack: IRppElement) => {
  const sourceNameProp = sourceTrack.properties.find(prop => prop.name === "NAME");
  const otherNameProp = otherTrack.properties.find(prop => prop.name === "NAME");
  return sourceNameProp && otherNameProp && sourceNameProp.attributes[0] === otherNameProp.attributes[0];
};
