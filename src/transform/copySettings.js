export function copySettings(sourceProject, otherProjects) {
  // Copy master settings
  const sourceRootElement = sourceProject.rootElement;
  const otherRootElements = otherProjects.map(proj => proj.rootElement);
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTERMUTESOLO");
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTER_VOLUME");
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTER_FX");

  // Copy settings for matching tracks
  sourceProject.rootElement.elements
    .filter(el => el.name === "TRACK")
    .forEach(sourceTrack => {
      const otherTracks = otherProjects
        .map(proj => proj.rootElement.elements)
        .reduce((all, current) => [...all, ...current])
        .filter(el => areTracksSame(sourceTrack, el));

      copyChildItem(sourceTrack, otherTracks, "properties", "VOLPAN");
      copyChildItem(sourceTrack, otherTracks, "properties", "MUTESOLO");
      copyChildItem(sourceTrack, otherTracks, "properties", "IPHASE");
      copyChildItem(sourceTrack, otherTracks, "properties", "FX");
      copyChildItem(sourceTrack, otherTracks, "properties", "MAINSEND");
      copyChildItem(sourceTrack, otherTracks, "elements", "FXCHAIN");
    });

  function copyChildItem(sourceElement, otherElements, listName, itemName) {
    const sourceItem = sourceElement[listName].find(item => item.name === itemName);

    otherElements.forEach(el => {
      const index = el[listName].findIndex(item => item.name === itemName);
      if (index < 0) {
        return;
      }

      el[listName][index] = sourceItem;
    });
  }

  function areTracksSame(sourceTrack, otherTrack) {
    const sourceNameProp = sourceTrack.properties.find(prop => prop.name === "NAME");
    const otherNameProp = otherTrack.properties.find(prop => prop.name === "NAME");
    return sourceNameProp && otherNameProp && sourceNameProp.attributes[0] === otherNameProp.attributes[0];
  }
}

export const copySettingsBody = `// Copy master settings
  const sourceRootElement = sourceProject.rootElement;
  const otherRootElements = otherProjects.map(proj => proj.rootElement);
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTERMUTESOLO");
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTER_VOLUME");
  copyChildItem(sourceRootElement, otherRootElements, "properties", "MASTER_FX");

  // Copy settings for matching tracks
  sourceProject.rootElement.elements
    .filter(el => el.name === "TRACK")
    .forEach(sourceTrack => {
      const otherTracks = otherProjects
        .map(proj => proj.rootElement.elements)
        .reduce((all, current) => [...all, ...current])
        .filter(el => areTracksSame(sourceTrack, el));

      copyChildItem(sourceTrack, otherTracks, "properties", "VOLPAN");
      copyChildItem(sourceTrack, otherTracks, "properties", "MUTESOLO");
      copyChildItem(sourceTrack, otherTracks, "properties", "IPHASE");
      copyChildItem(sourceTrack, otherTracks, "properties", "FX");
      copyChildItem(sourceTrack, otherTracks, "properties", "MAINSEND");
      copyChildItem(sourceTrack, otherTracks, "elements", "FXCHAIN");
    });

  function copyChildItem(sourceElement, otherElements, listName, itemName) {
	const sourceItem = sourceElement[listName]
		.find(item => item.name === itemName);

    otherElements.forEach(el => {
      const index = el[listName].findIndex(item => item.name === itemName);
      if (index < 0) {
        return;
      }

      el[listName][index] = sourceItem;
    });
  }

  function areTracksSame(sourceTrack, otherTrack) {
    const sourceNameProp = sourceTrack.properties.find(prop => prop.name === "NAME");
    const otherNameProp = otherTrack.properties.find(prop => prop.name === "NAME");
	return sourceNameProp 
		&& otherNameProp 
		&& sourceNameProp.attributes[0] === otherNameProp.attributes[0];
  }`;
