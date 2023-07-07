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
  