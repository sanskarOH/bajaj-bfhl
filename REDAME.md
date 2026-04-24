Here is the raw Markdown code for the README you provided. You can copy and paste this directly into your `README.md` file!

```markdown
# 📦 Bajaj BFHL – Full Stack Engineering Challenge

## 🚀 Overview

This project is a solution to the **Bajaj Finserv Full Stack Engineering Challenge (BFHL)**.  
It implements a REST API that processes hierarchical relationships from a list of node edges and returns structured insights including trees, cycles, and summary statistics.

The system is designed with a **production-ready backend architecture**, handling:
- Input validation
- Graph construction
- Cycle detection
- Tree generation
- Depth calculation
- Summary analytics

---

## 🧠 Problem Statement

Given an array of directed edges:

```json
["A->B", "A->C", "B->D"]
```

The API should:
* Validate input format
* Remove duplicates
* Construct hierarchical trees
* Detect cycles
* Compute depth
* Return structured JSON output

---

## 🏗️ Architecture

```text
server/
├── controllers/
├── services/
│   ├── validateInput.js
│   └── processGraph.js
├── routes/
├── app.js / server.js
├── package.json
```

### 🔹 Layers
* **Routes** → API endpoints
* **Controllers** → request/response handling
* **Services** → core business logic
* **Utils** → validation + graph processing

---

## ⚙️ Tech Stack
* **Backend:** Node.js, Express.js
* **Hosting:** Render
* **Version Control:** Git + GitHub

---

## 🌐 Live API
**POST** `https://<your-render-url>/bfhl`

---

## 📡 API Specification

### 🔸 Endpoint
`POST /bfhl`

### 🔸 Request Body
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

### 🔸 Response Example
```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "your@email.com",
  "college_roll_number": "your_roll",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": { "D": {} },
          "C": {}
        }
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

---

## 🔍 Core Logic Explained

### 1. Input Validation
* Accepts only format: `A->B`
* Rejects: invalid strings, lowercase / numbers, self-loops (`A->A`)

### 2. Graph Construction
* Uses Adjacency List
* Tracks indegree to find roots
* Handles multi-parent constraint (first parent wins)

### 3. Tree Building (DFS)
* Recursive traversal
* Builds nested object structure
* Calculates depth (longest path)

### 4. Cycle Detection
* Uses path tracking (Set)
* If node revisited → cycle detected

### 5. Special Cases
* **No root → cycle:** pick lexicographically smallest node
* **Duplicate edges:** tracked separately
* **Multiple trees:** handled independently

---

## 📊 Summary Metrics

| Field | Description |
| :--- | :--- |
| `total_trees` | Count of valid trees |
| `total_cycles` | Number of cyclic groups |
| `largest_tree_root` | Root with max depth |

---

## 🧪 Testing

Using cURL:
```bash
curl -X POST [https://your-url.onrender.com/bfhl](https://your-url.onrender.com/bfhl) \
-H "Content-Type: application/json" \
-d '{"data":["A->B","B->C"]}'
```

---

## ⚡ Performance
* **Time Complexity:** $O(V + E)$
* Handles up to 50 nodes within 3 seconds (as required)

---

## 🚀 Deployment
Deployed using **Render**

**Steps:**
1. Push code to GitHub
2. Connect repo to Render
3. Set Build command: `npm install`
4. Set Start command: `npm start`
5. Set root directory: `server`

---

## 🛠️ Setup Locally

```bash
git clone [https://github.com/sanskarOH/bajaj-bfhl](https://github.com/sanskarOH/bajaj-bfhl)
cd bajaj-bfhl/server
npm install
npm start
```

---

## 📁 Features Implemented
* ✅ Input validation
* ✅ Duplicate detection
* ✅ Cycle detection
* ✅ Multi-tree support
* ✅ Depth calculation
* ✅ Summary generation
* ✅ Clean architecture

---

## 💡 Key Learnings
* Graph traversal using DFS
* Handling edge cases in real-world problems
* Designing scalable APIs
* Clean backend architecture

---

## ⚠️ Important Notes
* CORS enabled for cross-origin requests
* Response time optimized under 3 seconds
* No hardcoded outputs

---

## 📌 Future Improvements
* Add frontend visualization (tree UI)
* Add unit tests
* Optimize DFS memory usage
* Add logging & monitoring

---

## 👨‍💻 Author
**Sanskar Diwedi** Backend Developer

**⭐ If you like this project** Give it a ⭐ on GitHub!
```