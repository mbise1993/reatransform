import ProjectService from './projectService';

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

export class Project {
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

  async getRppData() {
    if (this._data === null) {
      this._data = {
        name: this._name,
        rootElement: await ProjectService.rppToElement(this._content),
      };
    }

    return this._data!;
  }
}
