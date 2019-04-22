import { IRppElement } from "./reaperProject";

export default async (element: IRppElement) => {
  return new Promise<string>((resolve, reject) => {
    try {
      resolve(_elementToRpp(element));
    } catch (e) {
      reject(e);
    }
  });
};

const _elementToRpp = (element: IRppElement): string => {
  let lines: string[] = [];
  let indent = 0;

  const writeProperty = (prop: any) => {
    lines.push(`${" ".repeat(indent)}${prop.name} ${prop.attributes.join(" ")}`);
  };

  const writeElement = (el: any) => {
    lines.push(`${" ".repeat(indent)}<${el.name} ${el.attributes.join(" ")}`);
    indent += 2;

    el.properties.forEach((prop: any) => writeProperty(prop));
    el.elements.forEach((e: any) => writeElement(e));

    if (el.data) {
      lines.push(`${" ".repeat(indent)}${el.data}`);
    }

    indent -= 2;
    lines.push(`${" ".repeat(indent)}>`);
  };

  writeElement(element);
  return lines.join("\n");
};
