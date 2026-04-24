async function submitData() {
  const raw = document.getElementById("input").value;

  const data = raw.split(",").map(x => x.trim());

  try {
    const res = await fetch("/bfhl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const json = await res.json();

    renderResult(json);

  } catch (err) {
    document.getElementById("result").innerHTML =
      `<div class="card">Error connecting to API</div>`;
  }
}

function renderResult(data) {
  const container = document.getElementById("result");

  container.innerHTML = `
    <div class="card">
      <h3>Summary</h3>
      <p>Trees: ${data.summary.total_trees}</p>
      <p>Cycles: ${data.summary.total_cycles}</p>
      <p>Largest Root: ${data.summary.largest_tree_root}</p>
    </div>

    <div class="card">
      <h3>Hierarchies</h3>
      <pre>${JSON.stringify(data.hierarchies, null, 2)}</pre>
    </div>

    <div class="card">
      <h3>Invalid Entries</h3>
      <p>${data.invalid_entries.join(", ") || "None"}</p>
    </div>

    <div class="card">
      <h3>Duplicate Edges</h3>
      <p>${data.duplicate_edges.join(", ") || "None"}</p>
    </div>
  `;
}