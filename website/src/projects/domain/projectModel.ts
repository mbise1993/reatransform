import ProjectService from './projectService';

export type RppProperty = {
  name: string;
  attributes: Array<string | number>;
};

export type RppElement = {
  name: string;
  attributes: Array<string | number>;
  properties: Array<RppProperty>;
  elements: Array<RppElement>;
  data?: string;
};

export type RppData = {
  name: string;
  rootElement: RppElement;
};

let currentId = 1;

export class Project {
  private _id: number;
  private _data: RppData | null = null;

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
