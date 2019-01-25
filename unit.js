const TAU = 2 * Math.PI;
function Unit(x, y, r=10) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = 0;
  this.vy = 0;
  this.maxv = 1;
  this.target = {x: this.x, y: this.y};
  this.color = "blue";
  this.selected = false;

  this.getLocation = function() {
    return {x: this.x, y: this.y};
  }
  
  this.contains = function(x,y) {
    //square collision
    let dx = Math.abs(this.x - x)
    if (dx > this.r) return false;
    let dy = Math.abs(this.y - y)
    if (dy > this.r) return false;
    return true;
  }

  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, TAU);
    ctx.fill();
    if (this.selected) {
      ctx.strokeStyle = 'yellow';
      let temp = ctx.lineWidth;
      ctx.lineWidth = 4
      ctx.stroke();
      ctx.lineWidth = temp;
    }
  }

  this.update = function() {
    if (closeToPts(this.getLocation(), this.target)) {
      this.vx = 0;
      this.vy = 0;
      return
    }

    let dx = this.target.x - this.x;
    let dy = this.target.y - this.y;
    let hyp = Math.sqrt(dx*dx + dy*dy);
    dx /= hyp;
    dy /= hyp;
    this.vx = dx * this.maxv;
    this.vy = dy * this.maxv;
    this.x += this.vx;
    this.y += this.vy;
  }

}

function closeTo(a, b) {
  return Math.abs(a-b) <= .01;
}

function closeToPts(pt1, pt2) {
  return closeTo(pt1.x, pt2.x) && closeTo(pt1.y, pt2.y);
}

