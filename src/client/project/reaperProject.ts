import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import rppToElement from './rppToElement';
import elementToRpp from './elementToRpp';

export interface IRppProperty {
  name: string;
  attributes: Array<string | number>;
}

export interface IRppElement {
  name: string;
  attributes: Array<string | number>;
  properties: Array<IRppProperty>;
  elements: Array<IRppElement>;
  data?: string;
}

export interface IRppData {
  name: string;
  rootElement: IRppElement;
}

let currentId = 1;

export class ReaperProject {
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
        rootElement: await rppToElement(this._content),
      };
    }

    return this._data!;
  }
}

export const importProjects = async (files: FileList | null) => {
  if (files === null) {
    return;
  }

  const fileReadResults: Promise<ReaperProject>[] = [];

  for (let i = 0; i < files.length; ++i) {
    fileReadResults.push(readFile(files[i]));
  }

  return await Promise.all(fileReadResults);
};

const readFile = async (file: File) => {
  return await new Promise<ReaperProject>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = _e => {
      if (reader.result === null) {
        reject('Result was null');
      }

      resolve(new ReaperProject(file.name, reader.result as string));
    };

    reader.onerror = _e => {
      reject('Error reading file');
    };

    reader.readAsText(file);
  });
};

export const saveProjects = async (projects: IRppData[]) => {
  let zip = new JSZip();
  for (const proj of projects) {
    const content = await elementToRpp(proj.rootElement);
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
