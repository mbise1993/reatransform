import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import { objectToRpp } from './rppConverter';
import { IRppData } from '../models';

export const saveProjects = async (projects: IRppData[]) => {
  let zip = new JSZip();
  for (const proj of projects) {
    const content = await objectToRpp(proj.data);
    zip.file(getName(proj), content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'transforms.zip');
};

const getName = (project: IRppData) => {
  const index = project.name.lastIndexOf('.');
  const nameWithoutExt = index > -1 ? project.name.substring(0, index) : project.name;
  return `${nameWithoutExt}_Transformed.rpp`;
};
