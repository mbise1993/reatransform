import { readTestResource } from "../test/util";
import { adjustTempo } from "./adjustTempo";
import rppToElement from "../project/rppToElement";
import { IRppData } from "../project/reaperProject";

it("adjusts the tempo of a single project", async () => {
  await validateAdjustTempo([
    {
      fileName: "EmptyProject.rpp",
      originalTempo: 120,
    },
  ]);
});

it("adjusts the tempos of multiple projects", async () => {
  await validateAdjustTempo([
    {
      fileName: "EmptyProject.rpp",
      originalTempo: 120,
    },
    {
      fileName: "OneTrackWithMidiData.rpp",
      originalTempo: 120,
    },
    {
      fileName: "OneTrackWithOneVst.rpp",
      originalTempo: 120,
    },
  ]);
});

type TempoTestData = {
  fileName: string;
  originalTempo: number;
};

const validateAdjustTempo = async (testData: TempoTestData[]) => {
  const projectPromises = testData.map(async item => {
    const content = readTestResource(`${item.fileName}`);
    const rootElement = await rppToElement(content);
    return {
      name: item.fileName,
      rootElement: rootElement,
    } as IRppData;
  });

  const projects = await Promise.all(projectPromises);
  adjustTempo(projects);

  for (const project of projects) {
    const testDatum: any = testData.find(item => item.fileName === project.name);
    let tempoProp = getProperty(project.rootElement, "TEMPO");
    expect(tempoProp.attributes[0]).toBe(testDatum.originalTempo * 1.5);
  }
};

const getProperty = (el: any, name: string) => {
  const prop = el.properties.find((p: any) => p.name === name);
  expect(prop).toBeDefined();
  return prop;
};
