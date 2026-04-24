const { processGraph } = require("../services/graph.service");
const { validateInput } = require("../validators/bfhl.validators");



exports.processBFHL = (req, res) => {
  try {
    const { data } = req.body;

    const validation = validateInput(data);

    const result = processGraph(validation.validEdges);

    res.json({
      user_id: "sanskardiwedi_15062005",
      email_id: "sd4836@srmist.edu.in",
      college_roll_number: "RA2311030010287",
      hierarchies: result.hierarchies,
      invalid_entries: validation.invalidEdges,
      duplicate_edges: validation.duplicateEdges,
      summary: result.summary,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};