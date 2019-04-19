import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import { rppToObject, objectToRpp } from './rppConverter';

export interface IRppData {
  name: string;
  data: any;
}

let currentId = 1;

export class RppProject {
  private _id: number;
  private _data: IRppData | null = null;

  constructor(private _name: string, private _content: string) {
    this._id = currentId;
    currentId++;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get content() {
    return this._content;
  }

  async getData() {
    if (this._data === null) {
      this._data = {
        name: this._name,
        data: await rppToObject(this._content)
      };
    }

    return this._data!;
  }
}

export const importProjects = async (files: FileList | null) => {
  if (files === null) {
    return;
  }

  const fileReadResults: Promise<RppProject>[] = [];

  for (let i = 0; i < files.length; ++i) {
    fileReadResults.push(readFile(files[i]));
  }

  return await Promise.all(fileReadResults);
};

const readFile = async (file: File) => {
  return await new Promise<RppProject>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      if (reader.result === null) {
        reject('Result was null');
      }

      resolve(new RppProject(file.name, reader.result as string));
    };

    reader.onerror = e => {
      reject('Error reading file');
    };

    reader.readAsText(file);
  });
};

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
