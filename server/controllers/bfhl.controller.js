const { processGraph } = require("../services/graph.service");
const { validateInput } = require("../validators/bfhl.validators");



exports.processBFHL = (req, res) => {
  try {
    const { data } = req.body;

    const validation = validateInput(data);

    const result = processGraph(validation.validEdges);

    res.json({
      user_id: "yourname_ddmmyyyy",
      email_id: "your@email.com",
      college_roll_number: "YOURROLL",
      hierarchies: result.hierarchies,
      invalid_entries: validation.invalidEdges,
      duplicate_edges: validation.duplicateEdges,
      summary: result.summary,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};