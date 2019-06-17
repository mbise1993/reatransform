import safeEval from "safe-eval";
import _ from "lodash";

import { copySettingsBody } from "./copySettings";
import { adjustTempoBody } from "./adjustTempo";
import { IRppData } from "../project/reaperProject";

export interface ITransformScript {
  name: string;
  script: string;
}

export const runTransformScript = async (script: string, sourceProject: IRppData, otherProjects: IRppData[]) => {
  return new Promise<IRppData[]>((resolve, reject) => {
    try {
      const sourceProjectClone: IRppData = _.cloneDeep(sourceProject);
      const otherProjectsClone: IRppData[] = _.cloneDeep(otherProjects);
      const context = {
        sourceProject: sourceProjectClone,
        otherProjects: otherProjectsClone,
        allProjects: [sourceProjectClone, ...otherProjectsClone],
      };

      script = `(function run(){${script}})()`;
      safeEval(script, context);
      resolve(context.allProjects);
    } catch (e) {
      reject(e);
    }
  });
};

export const allScripts: ITransformScript[] = [
  {
    name: "Copy Settings",
    script: copySettingsBody,
  },
  {
    name: "Adjust Tempo",
    script: adjustTempoBody,
  },
  {
    name: "New Script",
    script: "// New script\n",
  },
];
