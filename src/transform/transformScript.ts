import { adjustTempoBody } from './transformFunctions';

export interface ITransformScript {
  name: string;
  script: string;
}

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
