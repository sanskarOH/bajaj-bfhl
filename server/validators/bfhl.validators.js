exports.validateInput = (data) => {
    const validEdges = [];
    const invalidEdges = [];
    const seenEdges = new Set();
    const duplicatesEdges = new Set();

    const regex = /^[A-Z]->[A-Z]$/;

    for (let entry of data) {
        entry = entry.trim();

        if(!regex.test(entry) || entry[0] === entry[3]){
            invalidEdges.push(entry);
            continue;
        }

        if (seenEdges.has(entry)){
            duplicatesEdges.add(entry);
            continue;
        }

        seenEdges.add(entry);
        validEdges.push(entry);
    }

    return {
        validEdges,
        invalidEdges,
        duplicatesEdges : Array.from(duplicatesEdges),
    };
};