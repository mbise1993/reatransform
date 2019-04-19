import safeEval from 'safe-eval';
import _ from 'lodash';

import { adjustTempoBody } from './transformFunctions';
import { IRppData } from '../project/rppProject';

export interface ITransformScript {
  name: string;
  script: string;
}

export const runTransformScript = async (
  script: string,
  sourceProject: IRppData,
  otherProjects: IRppData[]
) => {
  return new Promise<IRppData[]>((resolve, reject) => {
    try {
      const sourceProjectClone: IRppData = _.cloneDeep(sourceProject);
      const otherProjectsClone: IRppData[] = _.cloneDeep(otherProjects);
      const context = {
        sourceProject: sourceProjectClone,
        otherProjects: otherProjectsClone,
        allProjects: [sourceProjectClone, ...otherProjectsClone]
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
    name: 'New Script',
    script: '// New script'
  },
  {
    name: 'Adjust Tempo',
    script: adjustTempoBody
  }
];
