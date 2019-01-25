map = map ? map : [[]];
function PFNode(i, j, fromNode) {
  this.i = i;
  this.j = j;
  this.cost = 0;
  this.fromNode = fromNode;
  this.v = {x:0, y:0};
  
  if (fromNode) {
    this.v = {
      x: fromNode.j - this.j,
      y: fromNode.i - this.i
    };
    this.cost = computeTravelCost(fromNode.i, fromNode.j, this.i, this.j);
  }

  this.compareTo = function(that) {
    let c0 = this.cost;
    let c1 = that.cost;
    if (c0 < c1) return -1;
    if (c0 > c1) return 1;
    return 0;
  }

  this.addNeighbor = function(addI, addJ, list) {
    let ni = this.i + addI;
    let nj = this.j + addJ;
    if(!mapContains(ni, nj)) return;
    list.push(new PFNode(ni ,nj, this));
  }
  
  this.neighbors = function() {
    let list = [];
    // add N,E,S,W
    this.addNeighbor( 0, -1, list);
    this.addNeighbor( 1,  0, list);
    this.addNeighbor( 0,  1, list);
    this.addNeighbor(-1,  0, list);
  
    // add NW,NE,SW,SE corners
    this.addNeighbor(-1, -1, list);
    this.addNeighbor( 1, -1, list);
    this.addNeighbor(-1,  1, list);
    this.addNeighbor( 1,  1, list);
  
    return list;
  }
}

/*
 * @deprecated Since not needed
 */
function getAngle(i0, j0, i1, j1) {
  let di = i1 - i0;
  let dj = j1 - j0;
  let angle = Math.atan(dj/di);
  if (di < 0) {
    angle -= Math.PI;
  }
  return angle;
}

function getHeight(i, j) { 
  return map[i][j]; 
}

function computeDistance(i0, j0, i1, j1) {
  return Math.sqrt((i0 - i1) * (i0 - i1) + (j0 - j1) * (j0 - j1));
}

function computeTravelCost(i0, j0, i1, j1) {
  let h0 = getHeight(i0, j0);
  let h1 = getHeight(i1, j1);
  let hd = Math.abs(h0 - h1);
  let dist = (hd * 1000) + computeDistance(i0 ,j0, i1, j1);
  return dist;
}

function generateFlowField(i, j) {
  let field = []; //mauybe add count if you get stuck?
  for (let j = 0; j < map.length; j++) {
    field.push([])
    for (let i = 0; i < map[0].length; i++) {
      field[j].push(null);
    }
  }
  
  mpq = new PriorityQueue((a,b) => a.cost < b.cost);
  let root = new PFNode(i, j, null);
  mpq.push(root);
  
  while (!mpq.isEmpty()) {
    let current = mpq.pop();
    let ns = current.neighbors();
    for (let n of ns) {
      if (field[n.i][n.j] !== null) continue;
      field[n.i][n.j] = n;
      mpq.push(n);
    }
  }

  return field;
}

/*
public void computePath() {
  if(this.src == null || this.tar == null)
      throw new IllegalArgumentException("must set start and end points first");

  MinPQ<PFNode> pq = new MinPQ<>();
  pq.insert(new PFNode(this.src, null));

  PFNode solution = null;

  pathFound = false;
  pathCost = 0;
  searchSize = 0;

  while(!pq.isEmpty()) {
      PFNode next = pq.delMin();
      if(!next.isValid()) {
          //StdOut.println("invalid, skipping!");
          continue;
      }
      searchSize++;
      next.use();
      if(next.loc.equals(tar)) {
          solution = next;
          break;
      }
      for (PFNode n : next.neighbors()) {
          int i = n.loc.getI();
          int j = n.loc.getJ();
          PFNode np = searched[i][j];
          if(np == null) {
              searched[i][j] = n;
              pq.insert(n);
          } else {
              if(!np.isUsed() && n.compareTo(np) < 0) {
                  //StdOut.println("not used, replacing " + np.getCost(heuristic) + " with " + n.getCost(heuristic) + ")!");
                  np.invalidate();
                  searched[i][j] = n;
                  pq.insert(n);
              }
          }
      }
  }

  if(solution == null) {
      pathFound = false;
  } else {
      pathFound = true;
      pathCost = solution.getCost(0);
      pathSolution = new Stack<>();
      while(solution != null) {
          pathSolution.push(solution.loc);
          solution = solution.fromNode;
      }
  }
}

*/