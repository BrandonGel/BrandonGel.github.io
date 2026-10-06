/* Robots circulating a warehouse grid: the same animation as the header of
   /links/venues/. Runs on every <canvas class="warehouse-floor">. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dark = window.matchMedia("(prefers-color-scheme: dark)");

  function palette() {
    var d = dark.matches;
    return {
      grid: d ? "#2F3D4A" : "#C9D0D2",
      steel: d ? "#7FA9C8" : "#3E6A8A",
      safety: "#F2C230"
    };
  }

  function start(cv) {
    var ctx = cv.getContext("2d"), S = 22, W, H, cols, rows, bots = [];
    var shelf = function (x, y) { return y % 3 === 1 && x % 6 !== 0 && x % 6 !== 5; };
    var occ = function (x, y, self) {
      return bots.some(function (b) {
        return b !== self && ((b.tx === x && b.ty === y) || (b.x === x && b.y === y));
      });
    };

    function size() {
      var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = r.width; H = r.height; cols = Math.floor(W / S); rows = Math.floor(H / S);
      bots = [];
      var n = Math.max(6, Math.floor(cols * rows / 40));
      for (var i = 0; i < n; i++) {
        var x = Math.floor(Math.random() * cols), y = Math.floor(Math.random() * rows);
        if (shelf(x, y)) y = (y + 1) % rows;
        bots.push({ x: x, y: y, px: x, py: y, tx: x, ty: y, t: 1, c: i % 3 === 0 });
      }
    }

    function step() {
      bots.forEach(function (b) {
        if (b.t < 1) return;
        b.x = b.tx; b.y = b.ty;
        var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]].sort(function () { return Math.random() - 0.5; });
        for (var k = 0; k < dirs.length; k++) {
          var nx = b.x + dirs[k][0], ny = b.y + dirs[k][1];
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || shelf(nx, ny) || occ(nx, ny, b)) continue;
          b.px = b.x; b.py = b.y; b.tx = nx; b.ty = ny; b.t = 0; break;
        }
      });
    }

    function draw() {
      var c = palette(), x, y;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = c.grid; ctx.lineWidth = 1;
      for (x = 0; x <= cols; x++) { ctx.beginPath(); ctx.moveTo(x * S + 0.5, 0); ctx.lineTo(x * S + 0.5, rows * S); ctx.stroke(); }
      for (y = 0; y <= rows; y++) { ctx.beginPath(); ctx.moveTo(0, y * S + 0.5); ctx.lineTo(cols * S, y * S + 0.5); ctx.stroke(); }
      ctx.fillStyle = c.grid;
      for (y = 0; y < rows; y++) for (x = 0; x < cols; x++) if (shelf(x, y)) ctx.fillRect(x * S + 3, y * S + 3, S - 6, S - 6);
      bots.forEach(function (b) {
        if (!reduce) b.t = Math.min(1, b.t + 0.06);
        var e = b.t < 0.5 ? 2 * b.t * b.t : 1 - Math.pow(-2 * b.t + 2, 2) / 2;
        var bx = (b.px + (b.tx - b.px) * e) * S + S / 2, by = (b.py + (b.ty - b.py) * e) * S + S / 2;
        ctx.fillStyle = b.c ? c.safety : c.steel;
        ctx.beginPath(); ctx.arc(bx, by, S * 0.32, 0, Math.PI * 2); ctx.fill();
      });
      if (reduce) return;           /* still frame for reduced motion */
      step();
      requestAnimationFrame(draw);
    }

    size();
    window.addEventListener("resize", function () { size(); if (reduce) draw(); });
    dark.addEventListener && dark.addEventListener("change", function () { if (reduce) draw(); });
    requestAnimationFrame(draw);
  }

  document.querySelectorAll("canvas.warehouse-floor").forEach(start);
})();
