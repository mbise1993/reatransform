export const readTestResource = (filename: string) => {
  return require(`./resources/${filename}`).default;
};
