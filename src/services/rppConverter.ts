export const rppToObject = async (content: string) => {
  return await new Promise<any>((resolve, reject) => {
    try {
      resolve(_rppToObject(content));
    } catch (e) {
      reject(e);
    }
  });
};

const _rppToObject = (content: string) => {
  let lines = content.split('\n').map(l => l.trim());
  let lineNum = 0;

  const getValue = (data: any) => {
    return isNaN(data) ? data : +data;
  };

  const readProperty = () => {
    const tokens = lines[lineNum].split(' ');
    assert(
      tokens.length > 1,
      `Error at line ${lineNum + 1} ('${lines[lineNum]}') expected property, got data`
    );

    return {
      name: tokens[0],
      attributes: tokens.slice(1).map(tok => getValue(tok))
    };
  };

  const readElement = () => {
    let line = lines[lineNum];
    assert(line.charAt(0) === '<', `Error at line ${lineNum}: expected element`);

    const tokens = line.substring(1).split(' ');
    const element: any = {
      name: tokens[0],
      attributes: tokens.slice(1).map(tok => getValue(tok)),
      properties: [],
      elements: []
    };

    lineNum++;

    while (lineNum < lines.length) {
      line = lines[lineNum];

      // Check for start or end of element
      if (line.charAt(0) === '<') {
        element.elements.push(readElement());
      } else if (line === '>') {
        return element;
      } else {
        // Determine whether line is property or data
        var numTokens = line.split(' ').length;
        if (numTokens > 1) {
          element.properties.push(readProperty());
        } else if (numTokens === 1) {
          element.data = element.data ? element.data + line : line;
        }
      }

      lineNum++;
    }

    throw new Error('No closing tag found for element');
  };

  return readElement();
};

export const objectToRpp = async (obj: any) => {
  return new Promise<string>((resolve, reject) => {
    try {
      resolve(_objectToRpp(obj));
    } catch (e) {
      reject(e);
    }
  });
};

const _objectToRpp = (obj: any): string => {
  let lines: string[] = [];
  let indent = 0;

  const writeProperty = (prop: any) => {
    lines.push(`${' '.repeat(indent)}${prop.name} ${prop.attributes.join(' ')}`);
  };

  const writeElement = (el: any) => {
    lines.push(`${' '.repeat(indent)}<${el.name} ${el.attributes.join(' ')}`);
    indent += 2;

    el.properties.forEach(prop => writeProperty(prop));
    el.elements.forEach(e => writeElement(e));

    if (el.data) {
      lines.push(`${' '.repeat(indent)}${el.data}`);
    }

    indent -= 2;
    lines.push(`${' '.repeat(indent)}>`);
  };

  writeElement(obj);
  return lines.join('\n');
};

const assert = (expression: boolean, message: string) => {
  if (!expression) {
    throw new Error(message);
  }
};
