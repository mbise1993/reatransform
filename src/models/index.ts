import { rppToObject } from '../services/rppConverter';

export interface IRppData {
  name: string;
  data: any;
}

let currentId = 1;

export class RppProject {
  private _id: number;
  private _data: IRppData;

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
    if (!this._data) {
      this._data = {
        name: this._name,
        data: await rppToObject(this._content)
      };
    }

    return this._data;
  }
}

export interface Script {
  name: string;
  text: string;
}

export const scripts: Script[] = [
  {
    name: 'New script',
    text: '// New script'
  },
  {
    name: 'Copy settings',
    text: '// Copy settings'
  },
  {
    name: 'Adjust tempo',
    text: '// Adjust tempo'
  }
];
