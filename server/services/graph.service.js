const processGraph = (edges) => {
  
  const graph = {};
  const indegree = {};
  const childParentMap = {}; 


  for (let edge of edges) {
    const [parent, child] = edge.split("->");

  
    if (!graph[parent]) graph[parent] = [];
    if (!graph[child]) graph[child] = [];

  
    if (childParentMap[child] && childParentMap[child] !== parent) {
      continue; 
    }

    childParentMap[child] = parent;

    graph[parent].push(child);

    indegree[child] = (indegree[child] || 0) + 1;
    if (!(parent in indegree)) indegree[parent] = 0;
  }

  const visitedGlobal = new Set();
  const hierarchies = [];

  let totalCycles = 0;
  let maxDepth = 0;
  let largestRoot = "";

  const dfs = (node, path) => {
    if (path.has(node)) {
      return { cycle: true };
    }

    path.add(node);
    visitedGlobal.add(node);

    let subtree = {};
    let depth = 1;

    for (let child of graph[node]) {
      const res = dfs(child, new Set(path));

      if (res.cycle) return { cycle: true };

      subtree[child] = res.tree;
      depth = Math.max(depth, 1 + res.depth);
    }

    return { tree: subtree, depth };
  };


  const allNodes = Object.keys(indegree);

  const roots = allNodes.filter((n) => indegree[n] === 0);

  for (let root of roots) {
    if (visitedGlobal.has(root)) continue;

    const res = dfs(root, new Set());

    if (res.cycle) {
      totalCycles++;
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true,
      });
    } else {
      hierarchies.push({
        root,
        tree: { [root]: res.tree },
        depth: res.depth,
      });

      if (
        res.depth > maxDepth ||
        (res.depth === maxDepth && root < largestRoot)
      ) {
        maxDepth = res.depth;
        largestRoot = root;
      }
    }
  }


  for (let node of allNodes) {
    if (visitedGlobal.has(node)) continue;


    let component = [];
    let stack = [node];

    while (stack.length) {
      let curr = stack.pop();
      if (component.includes(curr)) continue;

      component.push(curr);

      for (let nei of graph[curr]) stack.push(nei);

      for (let key in graph) {
        if (graph[key].includes(curr)) stack.push(key);
      }
    }

    component.sort();
    const root = component[0];

    totalCycles++;

    hierarchies.push({
      root,
      tree: {},
      has_cycle: true,
    });

    component.forEach((n) => visitedGlobal.add(n));
  }

  return {
    hierarchies,
    summary: {
      total_trees: hierarchies.filter((h) => !h.has_cycle).length,
      total_cycles: totalCycles,
      largest_tree_root: largestRoot,
    },
  };
};

module.exports = {processGraph}