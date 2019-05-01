import safeEval from 'safe-eval';
import _ from 'lodash';

import { ITransformScript } from './transformScript';
import { Rest } from '../../shared/services';
import { IRppData } from '../../projects/domain';

import { copySettingsBody } from './copySettings';
import { adjustTempoBody } from './adjustTempo';

export class TransformService {
  static async getAllScripts() {
    const response = await Rest.get('/api/v1/scripts', {
      contentType: 'text/json',
    });

    console.log(`scripts response: ${JSON.stringify(response)}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as ITransformScript[];
  }

  static async saveScript(script: ITransformScript) {
    const response = await Rest.post('/api/v1/scripts', {
      contentType: 'text/json',
      params: JSON.stringify(script),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  static async deleteScript(id: string) {
    const response = await Rest.delete(`/api/v1/script/${id}`, {
      contentType: 'text/json',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  static async runScript(script: string, sourceProject: IRppData, otherProjects: IRppData[]) {
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
  }

  static getBuiltInScripts(): ITransformScript[] {
    return [
      {
        name: 'Copy Settings',
        script: copySettingsBody,
      },
      {
        name: 'Adjust Tempo',
        script: adjustTempoBody,
      },
      {
        name: 'New Script',
        script: '// New script\n',
      },
    ];
  }
}
