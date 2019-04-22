import fs from "fs";

export const readTestResource = (filename: string) => {
  return fs.readFileSync(`./src/test/resources/${filename}`, "utf8");
};
