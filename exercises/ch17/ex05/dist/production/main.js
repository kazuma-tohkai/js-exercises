(() => {
  "use strict";
  var e = {
    d: (t, n) => {
      for (const o in n)
        e.o(n, o) &&
          !e.o(t, o) &&
          Object.defineProperty(t, o, { enumerable: !0, get: n[o] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  };
  function t(e) {
    for (let t = 0; t < n; t++)
      for (let n = 0; n < o; n++) {
        const o = e[t][n];
        c.beginPath(),
          c.rect(n * l, t * l, l, l),
          (c.fillStyle = o ? "black" : "white"),
          c.fill(),
          c.stroke();
      }
  }
  e.d({}, { _1: () => o, $u: () => l, Ir: () => n, ej: () => c });
  const n = 50;
  const o = 50;
  const l = 10;
  const r = document.querySelector("#screen");
  const c = r.getContext("2d");
  const i = document.querySelector("#start");
  const a = document.querySelector("#pause");
  (r.width = n * l), (r.height = o * l);
  let u = null;
  const d = new Audio("/ex05/src/decision1.mp3");
  let f = new Array(n)
    .fill(null)
    .map(() =>
      new Array(o).fill(null).map(() => !!Math.floor(2 * Math.random()))
    );
  function s() {
    (f = (function (e) {
      const t = e.map((e) => [...e]);
      for (let l = 0; l < n; l++)
        for (let r = 0; r < o; r++) {
          let c = 0;
          [
            [l - 1, r - 1],
            [l - 1, r],
            [l - 1, r + 1],
            [l, r - 1],
            [l, r + 1],
            [l + 1, r - 1],
            [l + 1, r],
            [l + 1, r + 1],
          ].forEach(([t, l]) => {
            t >= 0 && t < n && l >= 0 && l < o && (c += e[t][l] ? 1 : 0);
          }),
            e[l][r] ? (t[l][r] = 2 === c || 3 === c) : (t[l][r] = 3 === c);
        }
      return t;
    })(f)),
      t(f),
      (u = requestAnimationFrame(s));
  }
  r.addEventListener("click", function (e) {
    const n = r.getBoundingClientRect();
    const o = e.clientX - n.left;
    const c = e.clientY - n.top;
    const i = Math.floor(c / l);
    const a = Math.floor(o / l);
    (f[i][a] = !f[i][a]), d.cloneNode().play(), t(f);
  }),
    i.addEventListener("click", () => {
      u || s();
    }),
    a.addEventListener("click", () => {
      u && (cancelAnimationFrame(u), (u = null));
    }),
    t(f);
})();
