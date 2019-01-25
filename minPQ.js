// function MinPQ() {
//   this.values = [];
//   this.enqueue = function(val) {
//     this.values.push(val);
//   }

//   this.getMinIndex = function() {
//     if (this.values.length > 0) {
//       let min = this.values[0].cost;
//       let mindex = 0;
//       for (let i = 1; i < this.values.length; i++) {
//         if (this.values[i].cost < min) {
//           min = this.values[i].cost;
//           mindex = i;
//         }
//       }
//       return mindex;
//     }
//     return -1
//   }

//   this.dequeue = function() {
//     let idx = this.getMinIndex();
//     return this.values.splice(idx, 1)[0];
//   }

//   this.getLength = function() {
//     return this.values.length;
//   }
// }

const topBop = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[topBop];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > topBop) {
      this._swap(topBop, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[topBop] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > topBop && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = topBop;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
