import { RppProject } from '../models';

const importProjects = async (files: FileList | null) => {
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

const mockImportProjects = async (files: FileList | null) => {
  return await new Promise<RppProject[]>((resolve, reject) => {
    resolve([new RppProject('Test Project 1', ''), new RppProject('Test Project 2', '')]);
  });
};

export { importProjects, mockImportProjects };
