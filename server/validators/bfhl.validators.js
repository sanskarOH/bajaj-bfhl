exports.validateInput = (data) => {
  const validEdges = [];
  const invalidEdges = [];
  const seenEdges = new Set();
  const duplicateEdges = new Set();

  const regex = /^[A-Z]->[A-Z]$/;

  for (let entry of data) {
  
    if (typeof entry !== "string") {
      invalidEdges.push(entry);
      continue;
    }

    entry = entry.trim();

    if (!entry) {
      invalidEdges.push(entry);
      continue;
    }

    if (!regex.test(entry) || entry[0] === entry[3]) {
      invalidEdges.push(entry);
      continue;
    }

    if (seenEdges.has(entry)) {
      duplicateEdges.add(entry);
      continue;
    }

    seenEdges.add(entry);
    validEdges.push(entry);
  }

  return {
    validEdges,
    invalidEdges,
    duplicateEdges: Array.from(duplicateEdges),
  };
};