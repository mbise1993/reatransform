import { ITransformScript } from './transformScript';
import { Rest } from '../../shared/services';

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
}
