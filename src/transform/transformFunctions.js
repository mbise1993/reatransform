export function adjustTempo(allProjects) {
  // Adjustment amount
  const modifier = 1.5;

  for (const project of allProjects) {
    const tempoProp = project.rootElement.properties.find(prop => prop.name === "TEMPO");
    if (tempoProp) {
      const tempo = tempoProp.attributes[0];
      tempoProp.attributes[0] = tempo * modifier;
    }
  }
}

export const adjustTempoBody = `// Adjustment amount
const modifier = 1.5;

for (const project of allProjects) {
  const tempoProp = project.rootElement.properties
    .find(prop => prop.name === 'TEMPO');

  if (tempoProp) {
    const tempo = tempoProp.attributes[0];
    tempoProp.attributes[0] = tempo * modifier;
  }
}`;
