import safeEval from 'safe-eval';
import _ from 'lodash';

import { TransformScript } from './transformModel';
import { Rest } from '../../shared/services';
import { RppData } from '../../projects/domain';

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

    return (await response.json()) as TransformScript[];
  }

  static async saveScript(script: TransformScript) {
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

  static async runScript(script: string, sourceProject: RppData, otherProjects: RppData[]) {
    return new Promise<RppData[]>((resolve, reject) => {
      try {
        const sourceProjectClone: RppData = _.cloneDeep(sourceProject);
        const otherProjectsClone: RppData[] = _.cloneDeep(otherProjects);
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

  static getBuiltInScripts(): TransformScript[] {
    return [
      {
        id: 'built-in-1',
        name: 'Copy Settings',
        script: copySettingsBody,
      },
      {
        id: 'built-in-2',
        name: 'Adjust Tempo',
        script: adjustTempoBody,
      },
      {
        id: 'built-in-3',
        name: 'New Script',
        script: '// New script\n',
      },
    ];
  }
}
