import safeEval from 'safe-eval';
import _ from 'lodash';

import { IRppData } from '../models';

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
