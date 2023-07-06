export const getAllNotes = async () => {
  const response = await fetch(`https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app/notes.json`);

  const data = await response.json();

  let notes = [];
  for (const monthCode in data) {
    for (const id in data[monthCode]) {
      const obj = data[monthCode][id];
      obj.monthCode = monthCode;
      obj.id = id;
      notes.push(obj);
    }
  }

  return notes;
};

export const getAllExistingSearchOptions = (notes) => {

  const monthCodesSet = new Set();
  const foldersSet = new Set();
  const createdAtsSet = new Set();
  const updatedAtsSet = new Set();

  for (const note of notes) {
    if (!monthCodesSet.has(note.monthCode)) {
      monthCodesSet.add(note.monthCode);
    }
    if (note.folder && !foldersSet.has(note.folder)) {
      foldersSet.add(note.folder);
    }
    if (!createdAtsSet.has(note.created_at)) {
      createdAtsSet.add(note.created_at);
    }
    if (!updatedAtsSet.has(note.updated_at)) {
      updatedAtsSet.add(note.updated_at);
    }
  }

  return {
    monthCodes: Array.from(monthCodesSet),
    folders: Array.from(foldersSet),
    created_ats: Array.from(createdAtsSet),
    updated_ats: Array.from(updatedAtsSet),
  };
};
