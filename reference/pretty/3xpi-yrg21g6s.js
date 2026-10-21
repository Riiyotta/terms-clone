(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  946085,
  (e) => {
    e.v({
      className: "geist_mono_cb236ac0-module__w7GWAW__className",
      variable: "geist_mono_cb236ac0-module__w7GWAW__variable",
    });
  },
  880369,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(271645),
      s = e.i(142488);
    let n = {
      className: s.default.className,
      style: {
        fontFamily:
          "'diatype', 'diatype Fallback', -apple-system, system-ui, Helvetica, Arial, sans-serif",
      },
    };
    null != s.default.variable && (n.variable = s.default.variable);
    var r = e.i(946085);
    let i = {
      className: r.default.className,
      style: {
        fontFamily:
          "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        fontWeight: 400,
        fontStyle: "normal",
      },
    };
    null != r.default.variable && (i.variable = r.default.variable);
    let o = {
        count: 12,
        fontSize: 11,
        opacity: 0.5,
        areaHeight: 800,
        top: -72,
        bleed: 80,
        gutter: 48,
        jog: 32,
        typeMs: 35,
        hold: 15e3,
        cursor: !0,
      },
      l = [
        "Write an NDA for a freelancer.",
        "Draft a design project contract.",
        "How many weeks is our agreement with Acme?",
        "$12,000, six weeks, 50% upfront.",
        "Make the payment terms net 30.",
        "Add two rounds of revisions.",
        "mutual confidentiality, two years",
        "ownership transfers on final payment",
        "terminate with 14 days’ written notice",
        "What did we agree with Studio North?",
        "Consulting agreement, hourly, capped.",
        "Send it to alex@acme.com to sign.",
        "effective on the date of the last signature",
        "Which contracts expire this quarter?",
        "a one-page letter of intent",
        "renews yearly unless either side opts out",
        "governed by the laws of Delaware",
        "Summarize the indemnity clause.",
        "Hire a contractor for the summer.",
        "deposit due before work begins",
      ];
    class d {
      rows;
      cols;
      cells;
      constructor(e, t) {
        ((this.rows = e),
          (this.cols = t),
          (this.cells = Array.from({ length: e }, () => Array(t).fill(" "))));
      }
      free(e, t, a, s, n) {
        for (let r = e - 1; r <= e + s; r++)
          for (let e = t - n; e < t + a + n; e++)
            if (
              !(r < 0) &&
              !(r >= this.rows) &&
              !(e < 0) &&
              !(e >= this.cols) &&
              " " !== this.cells[r][e]
            )
              return !1;
        return !0;
      }
    }
    e.s(
      [
        "DEFAULT_POETRY",
        0,
        o,
        "HeroPoetry",
        0,
        function ({ params: e = o, run: s = 0 }) {
          let n = (0, a.useRef)(null),
            r = (0, a.useRef)({ left: [], right: [] }),
            [c, u] = (0, a.useState)(null);
          (0, a.useEffect)(() => {
            let e = n.current;
            if (!e) return;
            let t = new ResizeObserver(() => {
              let t = e.clientWidth,
                a = Math.max(0, (t - (e.parentElement?.clientWidth ?? 0)) / 2);
              u((e) =>
                e && e.width === t && e.zone === a ? e : { width: t, zone: a },
              );
            });
            return (
              t.observe(e),
              e.parentElement && t.observe(e.parentElement),
              () => t.disconnect()
            );
          }, []);
          let h = (0, a.useMemo)(() => {
            if (!c || c.zone < 120) return null;
            let t = Math.max(0, c.zone - e.gutter);
            return {
              usable: t,
              cols: Math.floor(t / (0.6 * e.fontSize)),
              rows: Math.floor(e.areaHeight / (1.4 * e.fontSize)),
            };
          }, [c, e.gutter, e.fontSize, e.areaHeight]);
          (0, a.useEffect)(() => {
            if (!h) return;
            let t = {
                left: new d(h.rows, h.cols),
                right: new d(h.rows, h.cols),
              },
              a = [],
              n = null,
              i = 0xec4ba7 * s + 1,
              o = "left",
              c = null,
              u = "erase",
              m = Math.min(e.count, Math.max(2, Math.ceil(e.count / 2))),
              g = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
              p = (a, s) => {
                let n = r.current[a][s];
                if (!n) return;
                let i = [...t[a].cells[s]];
                (e.cursor &&
                  c &&
                  c.side === a &&
                  c.row === s &&
                  c.col < i.length &&
                  (i[c.col] = "▌"),
                  (n.textContent = i.join("")));
              },
              f = () =>
                ["left", "right"].forEach((e) => {
                  for (let t = 0; t < h.rows; t++) p(e, t);
                }),
              v = (e) => {
                let t = c;
                ((c = e), t && p(t.side, t.row), e && p(e.side, e.row));
              },
              _ = () => {
                let e = a.shift();
                return {
                  kind: "erase",
                  side: e.side,
                  cells: [...e.cells].reverse(),
                  at: 0,
                  phrase: e,
                };
              },
              w = (a) => {
                for (let s = 0; s < 2; s++) {
                  let s = (function (e, t, a, s) {
                    let n,
                      r =
                        ((n = a >>> 0),
                        () => {
                          let e = (n = (n + 0x6d2b79f5) >>> 0);
                          return (
                            (e = Math.imul(e ^ (e >>> 15), 1 | e)),
                            (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^
                              (e >>> 14)) >>>
                              0) /
                              0x100000000
                          );
                        }),
                      i = l[Math.floor(r() * l.length)].split(" "),
                      o = Math.min(i.length, 1 + Math.floor(3 * r())),
                      d = [],
                      c = 0;
                    for (let e = 0; e < o; e++) {
                      let t = o - e - 1,
                        a =
                          e === o - 1
                            ? i.length - c
                            : Math.max(
                                1,
                                Math.round(
                                  (i.length - c - t) * (0.4 + 0.5 * r()),
                                ),
                              );
                      (d.push(i.slice(c, c + a).join(" ")), (c += a));
                    }
                    let u = 0.6 * s.fontSize,
                      h = d.map((e, t) =>
                        Math.round(
                          (0 === t ? r() * s.jog * 0.5 : r() * s.jog) / u,
                        ),
                      ),
                      m = Math.max(...d.map((e, t) => h[t] + [...e].length)),
                      g = Math.floor(0.7 * t.cols);
                    for (let a = 0; a < 40; a++) {
                      let a =
                          "right" === e
                            ? Math.floor(r() * g)
                            : t.cols - m - Math.floor(r() * g),
                        s = Math.floor(r() * Math.max(1, t.rows - d.length));
                      if (!t.free(s, a, m, d.length, 2)) continue;
                      let n = [];
                      if (
                        (d.forEach((e, r) =>
                          [...e].forEach((e, i) => {
                            let o = a + h[r] + i;
                            o >= 0 &&
                              o < t.cols &&
                              n.push({ row: s + r, col: o, char: e });
                          }),
                        ),
                        n.length)
                      )
                        return n;
                    }
                    return null;
                  })((o = "left" === o ? "right" : "left"), t[o], i++, e);
                  if (s) {
                    let e = { side: o, cells: s, born: a };
                    return {
                      kind: "write",
                      side: o,
                      cells: s,
                      at: 0,
                      phrase: e,
                    };
                  }
                }
                return null;
              },
              x = (s, n) => {
                for (let r = 0; r < s; r++) {
                  let i = w(n);
                  if (!i || "write" !== i.kind) break;
                  (i.cells.forEach((e) => {
                    t[i.side].cells[e.row][e.col] = e.char;
                  }),
                    (i.phrase.born = n - e.hold * ((s - r) / (s + 1))),
                    a.push(i.phrase));
                }
              };
            if (g) {
              (x(e.count, 0), (c = null), f());
              return;
            }
            (x(m, 0), f());
            let j = performance.now(),
              N = window.setInterval(
                () =>
                  ((s) => {
                    if (
                      !n &&
                      !(n = ((t) => {
                        let s = a[0],
                          n = a.length >= e.count,
                          r = !!s && t - s.born > e.hold,
                          i = a.length > m;
                        if (s && (n || (r && i && "write" === u))) return _();
                        let o = w(t);
                        return o || (s && i ? _() : null);
                      })(s))
                    )
                      return void v(null);
                    let r = n.cells[n.at];
                    ((t[n.side].cells[r.row][r.col] =
                      "write" === n.kind ? r.char : " "),
                      v({
                        side: n.side,
                        row: r.row,
                        col: "write" === n.kind ? r.col + 1 : r.col,
                      }),
                      p(n.side, r.row),
                      n.at++,
                      n.at >= n.cells.length &&
                        ("write" === n.kind &&
                          ((n.phrase.born = s), a.push(n.phrase)),
                        (u = n.kind),
                        (n = null)));
                  })(performance.now() - j),
                Math.max(8, e.typeMs),
              );
            return () => {
              window.clearInterval(N);
            };
          }, [h, e, s]);
          let m = {
            "--poetry-size": `${e.fontSize}px`,
            "--poetry-opacity": e.opacity,
            "--poetry-height": `${e.areaHeight}px`,
            "--poetry-top": `${e.top}px`,
            "--poetry-bleed": `${e.bleed}px`,
            "--poetry-zone": h ? `${h.usable}px` : "0px",
          };
          return (0, t.jsx)("div", {
            ref: n,
            className: `landing-poetry ${i.variable}`,
            style: m,
            "aria-hidden": "true",
            children:
              h &&
              ["left", "right"].map((e) =>
                (0, t.jsx)(
                  "pre",
                  {
                    className: "landing-poetry-grid",
                    "data-side": e,
                    children: Array.from({ length: h.rows }, (a, s) =>
                      (0, t.jsx)(
                        "span",
                        {
                          ref: (t) => {
                            r.current[e][s] = t;
                          },
                          children: " ".repeat(h.cols),
                        },
                        s,
                      ),
                    ),
                  },
                  `${e}-${s}-${h.cols}x${h.rows}`,
                ),
              ),
          });
        },
      ],
      880369,
    );
  },
  142488,
  (e) => {
    e.v({
      className: "diatype_81649e75-module__kyoPyq__className",
      variable: "diatype_81649e75-module__kyoPyq__variable",
    });
  },
  712429,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(271645),
      s = e.i(451769),
      n = e.i(880369);
    let r = (e, t, a, s) => [n.DEFAULT_POETRY[e], t, a, s],
      i = {
        count: r("count", 0, 40, 1),
        fontSize: r("fontSize", 8, 18, 1),
        opacity: r("opacity", 0, 1, 0.05),
        areaHeight: r("areaHeight", 80, 1200, 10),
        top: r("top", -200, 400, 4),
        bleed: r("bleed", 0, 400, 10),
        gutter: r("gutter", 0, 240, 4),
        jog: r("jog", 0, 160, 2),
        typeMs: r("typeMs", 5, 150, 1),
        hold: r("hold", 1e3, 3e4, 100),
        cursor: n.DEFAULT_POETRY.cursor,
        reseed: { type: "action" },
      };
    e.s([
      "HeroPoetryDials",
      0,
      function () {
        let [e, r] = (0, a.useState)(0),
          o = (0, s.useDialKit)("Hero poetry", i, {
            id: "hero-poetry",
            persist: !0,
            onAction: () => r((e) => e + 1),
          }),
          l = (0, a.useMemo)(
            () => ({
              count: o.count,
              fontSize: o.fontSize,
              opacity: o.opacity,
              areaHeight: o.areaHeight,
              top: o.top,
              bleed: o.bleed,
              gutter: o.gutter,
              jog: o.jog,
              typeMs: o.typeMs,
              hold: o.hold,
              cursor: o.cursor,
            }),
            [o],
          );
        return (0, t.jsx)(n.HeroPoetry, { params: l, run: e });
      },
    ]);
  },
  279081,
  (e) => {
    e.v({
      agreement: "LandingPreview-module__aN7EWG__agreement",
      answerStack: "LandingPreview-module__aN7EWG__answerStack",
      card: "LandingPreview-module__aN7EWG__card",
      cardRail: "LandingPreview-module__aN7EWG__cardRail",
      changeNote: "LandingPreview-module__aN7EWG__changeNote",
      changedTerm: "LandingPreview-module__aN7EWG__changedTerm",
      chatHeading: "LandingPreview-module__aN7EWG__chatHeading",
      citation: "LandingPreview-module__aN7EWG__citation",
      citationHeading: "LandingPreview-module__aN7EWG__citationHeading",
      citationSection: "LandingPreview-module__aN7EWG__citationSection",
      clause: "LandingPreview-module__aN7EWG__clause",
      clauseHighlight: "LandingPreview-module__aN7EWG__clauseHighlight",
      clauseMarker: "LandingPreview-module__aN7EWG__clauseMarker",
      clauseText: "LandingPreview-module__aN7EWG__clauseText",
      commentCompose: "LandingPreview-module__aN7EWG__commentCompose",
      commentCount: "LandingPreview-module__aN7EWG__commentCount",
      commentDocument: "LandingPreview-module__aN7EWG__commentDocument",
      commentEmpty: "LandingPreview-module__aN7EWG__commentEmpty",
      commentPaper: "LandingPreview-module__aN7EWG__commentPaper",
      commentSend: "LandingPreview-module__aN7EWG__commentSend",
      commentSidebar: "LandingPreview-module__aN7EWG__commentSidebar",
      commentWorkspace: "LandingPreview-module__aN7EWG__commentWorkspace",
      composer: "LandingPreview-module__aN7EWG__composer",
      demoCursor: "LandingPreview-module__aN7EWG__demoCursor",
      documentFooter: "LandingPreview-module__aN7EWG__documentFooter",
      documentSection: "LandingPreview-module__aN7EWG__documentSection",
      documentShell: "LandingPreview-module__aN7EWG__documentShell",
      documentToolbar: "LandingPreview-module__aN7EWG__documentToolbar",
      draftChat: "LandingPreview-module__aN7EWG__draftChat",
      draftMessages: "LandingPreview-module__aN7EWG__draftMessages",
      draftReady: "LandingPreview-module__aN7EWG__draftReady",
      draftStage: "LandingPreview-module__aN7EWG__draftStage",
      draftWorkspace: "LandingPreview-module__aN7EWG__draftWorkspace",
      feature: "LandingPreview-module__aN7EWG__feature",
      featureBorder: "LandingPreview-module__aN7EWG__featureBorder",
      featureHeader: "LandingPreview-module__aN7EWG__featureHeader",
      featureHeading: "LandingPreview-module__aN7EWG__featureHeading",
      intro: "LandingPreview-module__aN7EWG__intro",
      launch: "LandingPreview-module__aN7EWG__launch",
      loop: "LandingPreview-module__aN7EWG__loop",
      measure: "LandingPreview-module__aN7EWG__measure",
      messages: "LandingPreview-module__aN7EWG__messages",
      paper: "LandingPreview-module__aN7EWG__paper",
      paperTitle: "LandingPreview-module__aN7EWG__paperTitle",
      playbackButton: "LandingPreview-module__aN7EWG__playbackButton",
      preview: "LandingPreview-module__aN7EWG__preview",
      previews: "LandingPreview-module__aN7EWG__previews",
      question: "LandingPreview-module__aN7EWG__question",
      questionComposer: "LandingPreview-module__aN7EWG__questionComposer",
      questionStage: "LandingPreview-module__aN7EWG__questionStage",
      questionWorkspace: "LandingPreview-module__aN7EWG__questionWorkspace",
      recents: "LandingPreview-module__aN7EWG__recents",
      replyStage: "LandingPreview-module__aN7EWG__replyStage",
      resolveStack: "LandingPreview-module__aN7EWG__resolveStack",
      resolved: "LandingPreview-module__aN7EWG__resolved",
      responseStack: "LandingPreview-module__aN7EWG__responseStack",
      reveal: "LandingPreview-module__aN7EWG__reveal",
      saved: "LandingPreview-module__aN7EWG__saved",
      statusStack: "LandingPreview-module__aN7EWG__statusStack",
      thinking: "LandingPreview-module__aN7EWG__thinking",
      thread: "LandingPreview-module__aN7EWG__thread",
      threadStage: "LandingPreview-module__aN7EWG__threadStage",
    });
  },
  944636,
  143306,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(348978),
      s = e.i(320558);
    let n = [
        [
          "path",
          {
            d: "M16.9506 3.25L17 3.25L17.0494 3.25H17.0494C17.7143 3.24996 18.2871 3.24993 18.7458 3.31161C19.2375 3.37771 19.7087 3.52677 20.091 3.90901C20.4732 4.29126 20.6223 4.76252 20.6884 5.25416C20.7501 5.71291 20.75 6.28577 20.75 6.95064V17.0494C20.75 17.7142 20.7501 18.2871 20.6884 18.7458C20.6223 19.2375 20.4732 19.7087 20.091 20.091C19.7087 20.4732 19.2375 20.6223 18.7458 20.6884C18.2871 20.7501 17.7142 20.75 17.0494 20.75H16.9506C16.2858 20.75 15.7129 20.7501 15.2542 20.6884C14.7625 20.6223 14.2913 20.4732 13.909 20.091C13.5268 19.7087 13.3777 19.2375 13.3116 18.7458C13.2499 18.2871 13.25 17.7143 13.25 17.0494V17.0494V6.95063V6.95058C13.25 6.28574 13.2499 5.71289 13.3116 5.25416C13.3777 4.76252 13.5268 4.29126 13.909 3.90901C14.2913 3.52677 14.7625 3.37771 15.2542 3.31161C15.7129 3.24993 16.2857 3.24996 16.9506 3.25H16.9506Z",
            fill: "currentColor",
            key: "0",
          },
        ],
        [
          "path",
          {
            d: "M6.95074 3.25L7.00011 3.25L7.04948 3.25H7.04954C7.71438 3.24996 8.28722 3.24993 8.74595 3.31161C9.23759 3.37771 9.70885 3.52677 10.0911 3.90901C10.4733 4.29126 10.6224 4.76252 10.6885 5.25416C10.7502 5.71291 10.7501 6.28577 10.7501 6.95064V17.0494C10.7501 17.7142 10.7502 18.2871 10.6885 18.7458C10.6224 19.2375 10.4733 19.7087 10.0911 20.091C9.70885 20.4732 9.23759 20.6223 8.74595 20.6884C8.28721 20.7501 7.71435 20.75 7.04948 20.75H6.95074C6.28587 20.75 5.71301 20.7501 5.25427 20.6884C4.76263 20.6223 4.29137 20.4732 3.90912 20.091C3.52687 19.7087 3.37781 19.2375 3.31172 18.7458C3.25004 18.2871 3.25007 17.7143 3.25011 17.0494V17.0494V6.95063V6.95058C3.25007 6.28574 3.25004 5.71289 3.31172 5.25416C3.37781 4.76252 3.52687 4.29126 3.90912 3.90901C4.29137 3.52677 4.76263 3.37771 5.25427 3.31161C5.713 3.24993 6.28584 3.24996 6.95068 3.25H6.95074Z",
            fill: "currentColor",
            key: "1",
          },
        ],
      ],
      r = [
        [
          "path",
          {
            d: "M13.9405 6.337C15.5735 7.26468 16.8567 7.99369 17.7709 8.66148C18.6913 9.33386 19.3721 10.0366 19.6159 10.9632C19.7947 11.6426 19.7947 12.3574 19.6159 13.0368C19.3721 13.9634 18.6913 14.6661 17.7709 15.3385C16.8567 16.0063 15.5735 16.7353 13.9406 17.663L13.9406 17.663C12.3632 18.5591 11.033 19.3148 10.0232 19.7444C9.0053 20.1773 8.07729 20.3968 7.17536 20.1412C6.51252 19.9533 5.90941 19.5968 5.42356 19.1066C4.76419 18.4414 4.49951 17.5219 4.37429 16.4154C4.24998 15.3169 4.24999 13.879 4.25 12.0501V12.0501V11.9499V11.9499C4.24999 10.121 4.24998 8.68309 4.37429 7.58464C4.49951 6.4781 4.76419 5.55861 5.42356 4.89335C5.90941 4.40317 6.51252 4.04666 7.17536 3.85883C8.07729 3.60325 9.0053 3.82269 10.0232 4.25565C11.033 4.68516 12.3632 5.44084 13.9405 6.337Z",
            fill: "currentColor",
            key: "0",
          },
        ],
      ];
    var i = e.i(491185),
      o = e.i(337438),
      l = e.i(271645),
      d = {
        topLeft: [
          { corner: "topRight", side: "top" },
          { corner: "bottomLeft", side: "left" },
        ],
        topRight: [
          { corner: "topLeft", side: "top" },
          { corner: "bottomRight", side: "right" },
        ],
        bottomLeft: [
          { corner: "bottomRight", side: "bottom" },
          { corner: "topLeft", side: "left" },
        ],
        bottomRight: [
          { corner: "bottomLeft", side: "bottom" },
          { corner: "topRight", side: "right" },
        ],
      };
    function c({
      cornerRadius: e,
      cornerSmoothing: t,
      preserveSmoothing: a,
      roundingAndSmoothingBudget: s,
    }) {
      let n = (1 + t) * e;
      a || ((t = Math.min(t, s / e - 1)), (n = Math.min(n, s)));
      let r = 90 * (1 - t),
        i = Math.sin(h(r / 2)) * e * Math.sqrt(2),
        o = e * Math.tan(h((90 - r) / 2 / 2)),
        l = 45 * t,
        d = o * Math.cos(h(l)),
        u = d * Math.tan(h(l)),
        m = (n - i - d - u) / 3,
        g = 2 * m;
      if (a && n > s) {
        let e = s - u - i - d;
        ((m = Math.min(m, e - e / 6)), (g = e - m), (n = Math.min(n, s)));
      }
      return {
        a: g,
        b: m,
        c: d,
        d: u,
        p: n,
        arcSectionLength: i,
        cornerRadius: e,
      };
    }
    function u({
      width: e,
      height: t,
      topLeftPathParams: a,
      topRightPathParams: s,
      bottomLeftPathParams: n,
      bottomRightPathParams: r,
    }) {
      return `
    M ${e - s.p} 0
    ${(function ({
      cornerRadius: e,
      a: t,
      b: a,
      c: s,
      d: n,
      p: r,
      arcSectionLength: i,
    }) {
      return e
        ? m`
    c ${t} 0 ${t + a} 0 ${t + a + s} ${n}
    a ${e} ${e} 0 0 1 ${i} ${i}
    c ${n} ${s}
        ${n} ${a + s}
        ${n} ${t + a + s}`
        : m`l ${r} 0`;
    })(s)}
    L ${e} ${t - r.p}
    ${(function ({
      cornerRadius: e,
      a: t,
      b: a,
      c: s,
      d: n,
      p: r,
      arcSectionLength: i,
    }) {
      return e
        ? m`
    c 0 ${t}
      0 ${t + a}
      ${-n} ${t + a + s}
    a ${e} ${e} 0 0 1 -${i} ${i}
    c ${-s} ${n}
      ${-(a + s)} ${n}
      ${-(t + a + s)} ${n}`
        : m`l 0 ${r}`;
    })(r)}
    L ${n.p} ${t}
    ${(function ({
      cornerRadius: e,
      a: t,
      b: a,
      c: s,
      d: n,
      p: r,
      arcSectionLength: i,
    }) {
      return e
        ? m`
    c ${-t} 0
      ${-(t + a)} 0
      ${-(t + a + s)} ${-n}
    a ${e} ${e} 0 0 1 -${i} -${i}
    c ${-n} ${-s}
      ${-n} ${-(a + s)}
      ${-n} ${-(t + a + s)}`
        : m`l ${-r} 0`;
    })(n)}
    L 0 ${a.p}
    ${(function ({
      cornerRadius: e,
      a: t,
      b: a,
      c: s,
      d: n,
      p: r,
      arcSectionLength: i,
    }) {
      return e
        ? m`
    c 0 ${-t}
      0 ${-(t + a)}
      ${n} ${-(t + a + s)}
    a ${e} ${e} 0 0 1 ${i} -${i}
    c ${s} ${-n}
      ${a + s} ${-n}
      ${t + a + s} ${-n}`
        : m`l 0 ${-r}`;
    })(a)}
    Z
  `
        .replace(/[\t\s\n]+/g, " ")
        .trim();
    }
    function h(e) {
      return (e * Math.PI) / 180;
    }
    function m(e, ...t) {
      return e.reduce((e, a, s) => {
        let n = t[s];
        return "number" == typeof n ? e + a + n.toFixed(4) : e + a + (n ?? "");
      }, "");
    }
    function g({
      radius: e = 24,
      smoothing: a = 0.6,
      className: s = "",
      style: n,
      children: r,
    }) {
      let i = (0, l.useRef)(null),
        [o, h] = (0, l.useState)("");
      (0, l.useEffect)(() => {
        let t = i.current;
        if (!t) return;
        let s = new ResizeObserver(([t]) => {
          let { width: s, height: n } = t.contentRect;
          s &&
            n &&
            h(
              (function ({
                cornerRadius: e = 0,
                topLeftCornerRadius: t,
                topRightCornerRadius: a,
                bottomRightCornerRadius: s,
                bottomLeftCornerRadius: n,
                cornerSmoothing: r,
                width: i,
                height: o,
                preserveSmoothing: l = !1,
              }) {
                if (
                  ((t = t ?? e),
                  (a = a ?? e),
                  (n = n ?? e),
                  (s = s ?? e),
                  t === a && a === s && s === n && n === t)
                ) {
                  let e = Math.min(i, o) / 2,
                    a = c({
                      cornerRadius: Math.min(t, e),
                      cornerSmoothing: r,
                      preserveSmoothing: l,
                      roundingAndSmoothingBudget: e,
                    });
                  return u({
                    width: i,
                    height: o,
                    topLeftPathParams: a,
                    topRightPathParams: a,
                    bottomLeftPathParams: a,
                    bottomRightPathParams: a,
                  });
                }
                let {
                  topLeft: h,
                  topRight: m,
                  bottomLeft: g,
                  bottomRight: p,
                } = (function ({
                  topLeftCornerRadius: e,
                  topRightCornerRadius: t,
                  bottomRightCornerRadius: a,
                  bottomLeftCornerRadius: s,
                  width: n,
                  height: r,
                }) {
                  let i = {
                      topLeft: -1,
                      topRight: -1,
                      bottomLeft: -1,
                      bottomRight: -1,
                    },
                    o = {
                      topLeft: e,
                      topRight: t,
                      bottomLeft: s,
                      bottomRight: a,
                    };
                  return (
                    Object.entries(o)
                      .sort(([, e], [, t]) => t - e)
                      .forEach(([e, t]) => {
                        let a = Math.min(
                          ...d[e].map((e) => {
                            let a = o[e.corner];
                            if (0 === t && 0 === a) return 0;
                            let s = i[e.corner],
                              l =
                                "top" === e.side || "bottom" === e.side ? n : r;
                            return s >= 0 ? l - i[e.corner] : (t / (t + a)) * l;
                          }),
                        );
                        ((i[e] = a), (o[e] = Math.min(t, a)));
                      }),
                    {
                      topLeft: {
                        radius: o.topLeft,
                        roundingAndSmoothingBudget: i.topLeft,
                      },
                      topRight: {
                        radius: o.topRight,
                        roundingAndSmoothingBudget: i.topRight,
                      },
                      bottomLeft: {
                        radius: o.bottomLeft,
                        roundingAndSmoothingBudget: i.bottomLeft,
                      },
                      bottomRight: {
                        radius: o.bottomRight,
                        roundingAndSmoothingBudget: i.bottomRight,
                      },
                    }
                  );
                })({
                  topLeftCornerRadius: t,
                  topRightCornerRadius: a,
                  bottomRightCornerRadius: s,
                  bottomLeftCornerRadius: n,
                  width: i,
                  height: o,
                });
                return u({
                  width: i,
                  height: o,
                  topLeftPathParams: c({
                    cornerSmoothing: r,
                    preserveSmoothing: l,
                    cornerRadius: h.radius,
                    roundingAndSmoothingBudget: h.roundingAndSmoothingBudget,
                  }),
                  topRightPathParams: c({
                    cornerSmoothing: r,
                    preserveSmoothing: l,
                    cornerRadius: m.radius,
                    roundingAndSmoothingBudget: m.roundingAndSmoothingBudget,
                  }),
                  bottomRightPathParams: c({
                    cornerSmoothing: r,
                    preserveSmoothing: l,
                    cornerRadius: p.radius,
                    roundingAndSmoothingBudget: p.roundingAndSmoothingBudget,
                  }),
                  bottomLeftPathParams: c({
                    cornerSmoothing: r,
                    preserveSmoothing: l,
                    cornerRadius: g.radius,
                    roundingAndSmoothingBudget: g.roundingAndSmoothingBudget,
                  }),
                });
              })({
                width: s,
                height: n,
                cornerRadius: e,
                cornerSmoothing: a,
                preserveSmoothing: !0,
              }),
            );
        });
        return (s.observe(t), () => s.disconnect());
      }, [e, a]);
      let m = {
        ...n,
        "--squircle-radius": `${e}px`,
        ...(o ? { "--squircle-path": `path("${o}")` } : {}),
      };
      return (0, t.jsxs)("div", {
        ref: i,
        className: `squircle ${s}`,
        style: m,
        children: [
          (0, t.jsx)("div", {
            className: "squircle-shadow",
            "aria-hidden": "true",
            children: (0, t.jsx)("div", { className: "squircle-shadow-shape" }),
          }),
          (0, t.jsx)("div", { className: "squircle-body", children: r }),
          (0, t.jsx)("svg", {
            className: "squircle-border",
            "aria-hidden": "true",
            focusable: "false",
            children: (0, t.jsx)("path", { d: o }),
          }),
        ],
      });
    }
    var p = e.i(279081);
    let f = () => {},
      v = [
        {
          title: "Acme — Consulting agreement",
          date: "September 24, 2026",
          status: "Signed",
          tone: "signed",
        },
        {
          title: "Studio North — Design services",
          date: "September 22, 2026",
          status: "Awaiting counterparty",
          tone: "waiting",
        },
        {
          title: "Mutual non-disclosure agreement",
          date: "September 18, 2026",
          status: "Draft",
          tone: "draft",
        },
      ];
    function _({ parts: e, characters: a = 1 / 0 }) {
      return (0, t.jsx)(t.Fragment, {
        children: e.map((s, n) => {
          let r = e.slice(0, n).reduce((e, t) => e + t.text.length, 0),
            i = s.text.slice(0, Math.max(0, a - r));
          return s.emphasis ? (0, t.jsx)("strong", { children: i }, n) : i;
        }),
      });
    }
    (e.s(
      [
        "PreviewComposer",
        0,
        function ({
          value: e = "",
          sending: a = !1,
          busy: s = !1,
          compact: n = !1,
          placeholder: r = "Ask a question or describe a change…",
        }) {
          return (0, t.jsx)("div", {
            className: p.default.composer,
            "data-sending": a,
            children: (0, t.jsx)(i.HomeComposer, {
              preview: !0,
              value: e,
              onChange: f,
              onSubmit: f,
              onAttach: f,
              onRemove: f,
              attachments: [],
              busy: s,
              uploading: !1,
              compact: n,
              placeholder: r,
            }),
          });
        },
        "PreviewCursor",
        0,
        function ({ visible: e, arrived: a }) {
          return (0, t.jsx)("span", {
            className: p.default.demoCursor,
            "data-show": e,
            "data-arrived": a,
            "aria-hidden": "true",
          });
        },
        "PreviewFrame",
        0,
        function ({
          id: e,
          label: i,
          subtitle: o,
          description: l,
          containerRef: d,
          running: c,
          loopState: u,
          phase: h,
          paused: m,
          onTogglePaused: f,
          children: v,
        }) {
          return (0, t.jsx)("section", {
            ref: d,
            id: e,
            className: p.default.feature,
            "aria-labelledby": `preview-${e}`,
            "data-preview": e,
            "data-phase": h,
            "data-running": c,
            "data-paused": m,
            children: (0, t.jsxs)(g, {
              radius: 24,
              smoothing: 0.6,
              className: p.default.card,
              children: [
                (0, t.jsxs)("header", {
                  className: p.default.featureHeader,
                  children: [
                    (0, t.jsx)("svg", {
                      className: p.default.featureBorder,
                      "aria-hidden": "true",
                      focusable: "false",
                      children: (0, t.jsx)("rect", {
                        width: "100%",
                        height: "100%",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "0.75",
                        strokeDasharray: "4 6",
                        strokeLinecap: "round",
                      }),
                    }),
                    (0, t.jsx)("h3", {
                      className: p.default.featureHeading,
                      id: `preview-${e}`,
                      children: i,
                    }),
                    (0, t.jsx)("p", { children: o }),
                    (0, t.jsx)(a.Button, {
                      type: "button",
                      variant: "secondary",
                      size: "compact",
                      className: p.default.playbackButton,
                      onClick: f,
                      "aria-label": `${m ? "Resume" : "Pause"} ${i} animation`,
                      "aria-controls": `preview-${e}-animation`,
                      title: m ? "Resume animation" : "Pause animation",
                      children: (0, t.jsx)(s.Icon, { icon: m ? r : n }),
                    }),
                  ],
                }),
                (0, t.jsxs)("p", {
                  className: "sr-only",
                  children: [
                    l,
                    " This is an animated example with sample agreements.",
                  ],
                }),
                (0, t.jsx)("div", {
                  className: `landing-card ${p.default.preview}`,
                  children: (0, t.jsx)("div", {
                    id: `preview-${e}-animation`,
                    className: p.default.loop,
                    "data-loop-state": u,
                    "aria-hidden": "true",
                    children: v,
                  }),
                }),
              ],
            }),
          });
        },
        "SampleAgreements",
        0,
        function ({ visible: e = !0 }) {
          return (0, t.jsxs)("section", {
            className: `dashboard-recents ${p.default.recents}`,
            "data-show": e,
            children: [
              (0, t.jsx)("h3", { children: "Recent contracts:" }),
              (0, t.jsx)("div", {
                className: "dashboard-contracts",
                children: v.map((e) =>
                  (0, t.jsxs)(
                    "div",
                    {
                      className: `dashboard-contract ${p.default.agreement}`,
                      children: [
                        (0, t.jsxs)("div", {
                          className: "dashboard-contract-copy",
                          children: [
                            (0, t.jsx)("span", {
                              className: "dashboard-contract-title",
                              children: e.title,
                            }),
                            (0, t.jsx)("span", {
                              className: "dashboard-contract-date",
                              children: e.date,
                            }),
                          ],
                        }),
                        (0, t.jsx)("span", {
                          className: `dashboard-status dashboard-status--${e.tone}`,
                          children: e.status,
                        }),
                      ],
                    },
                    e.title,
                  ),
                ),
              }),
            ],
          });
        },
        "StreamingAnswer",
        0,
        function ({ parts: e, time: a, start: s, visible: n }) {
          return (0, t.jsxs)("div", {
            className: `${p.default.answerStack} ${p.default.reveal}`,
            "data-show": n,
            children: [
              (0, t.jsx)("div", {
                className: `home-chat-text ${p.default.measure}`,
                children: (0, t.jsx)("p", {
                  children: (0, t.jsx)(_, { parts: e }),
                }),
              }),
              (0, t.jsx)("div", {
                className: "home-chat-text",
                children: (0, t.jsx)("p", {
                  children: (0, t.jsx)(_, {
                    parts: e,
                    characters: Math.max(0, Math.floor((a - s) / 22)),
                  }),
                }),
              }),
            ],
          });
        },
        "Thinking",
        0,
        function ({ visible: e, label: a }) {
          return (0, t.jsxs)("div", {
            className: `${p.default.thinking} ${p.default.reveal}`,
            "data-show": e,
            children: [
              (0, t.jsx)(o.DotGrid, {}),
              a && (0, t.jsx)("span", { children: a }),
            ],
          });
        },
        "UserMessage",
        0,
        function ({ children: e, visible: a }) {
          return (0, t.jsx)("div", {
            className: `home-message home-message--user ${p.default.question}`,
            "data-show": a,
            children: (0, t.jsx)("div", {
              className: "home-chat-text",
              children: (0, t.jsx)("p", {
                children: (0, t.jsx)("strong", { children: e }),
              }),
            }),
          });
        },
      ],
      944636,
    ),
      e.s(
        [
          "typed",
          0,
          function (e, t, a, s = 28) {
            return e.slice(0, Math.max(0, Math.floor((t - a) / s)));
          },
          "usePreviewTimeline",
          0,
          function (e, t) {
            let a = (0, l.useRef)(null),
              [s, n] = (0, l.useState)(0),
              [r, i] = (0, l.useState)(!1),
              [o, d] = (0, l.useState)(null),
              [c, u] = (0, l.useState)(!1),
              h = o ?? c;
            ((0, l.useEffect)(() => {
              let s,
                r = window.matchMedia("(prefers-reduced-motion: reduce)"),
                l = !1;
              function d() {
                (clearInterval(s), u(r.matches));
                let a = l && !document.hidden && !(o ?? r.matches);
                (i(a),
                  r.matches && null === o
                    ? n(t)
                    : a && (s = setInterval(() => n((t) => (t + 40) % e), 40)));
              }
              let c = new IntersectionObserver(
                ([e]) => {
                  ((l = e.isIntersecting && e.intersectionRatio >= 0.12), d());
                },
                { threshold: 0.12 },
              );
              return (
                a.current && c.observe(a.current),
                r.addEventListener("change", d),
                document.addEventListener("visibilitychange", d),
                () => {
                  (clearInterval(s),
                    c.disconnect(),
                    r.removeEventListener("change", d),
                    document.removeEventListener("visibilitychange", d));
                }
              );
            }, [e, t, o]),
              (0, l.useLayoutEffect)(() => {
                if (!h) return;
                let e = a.current?.querySelector("[data-loop-state]"),
                  t =
                    e
                      ?.getAnimations({ subtree: !0 })
                      .filter(
                        (e) =>
                          e instanceof CSSTransition &&
                          "running" === e.playState,
                      ) ?? [];
                return (
                  t.forEach((e) => e.pause()),
                  () =>
                    t.forEach((e) => {
                      "paused" === e.playState && e.play();
                    })
                );
              }, [h]));
            let m = e - 240 - 120 - 320,
              g = e - 120 - 320,
              p =
                s >= e - 320
                  ? "fading-in"
                  : s >= g
                    ? "rewinding"
                    : s >= m
                      ? "fading-out"
                      : "playing";
            return {
              ref: a,
              time: "playing" === p ? s : "fading-out" === p ? m : 0,
              running: r && !h,
              loopState: p,
              resetting: "playing" !== p,
              paused: h,
              togglePaused: () => d((e) => !(e ?? c)),
            };
          },
        ],
        143306,
      ));
  },
  79975,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(348978),
      s = e.i(320558),
      n = e.i(197944);
    let r = [
      [
        "path",
        {
          d: "M12 1.75C17.6609 1.75 22.25 6.33908 22.25 12C22.25 17.6609 17.6609 22.25 12 22.25C10.2448 22.25 8.59046 21.8084 7.14453 21.0293C6.38511 20.6201 5.78228 20.6112 5.23633 20.7139C4.94458 20.7688 4.66731 20.8556 4.3584 20.9531L4.34082 20.959C4.05369 21.0496 3.7164 21.1558 3.37793 21.207C2.95556 21.2709 2.5542 21.1147 2.2793 20.8398C1.8481 20.4083 1.80203 19.788 2.00293 19.3145L2.07617 19.1318C2.43613 18.1714 2.70956 16.5536 2.27148 15.2363C1.9329 14.2181 1.75 13.1296 1.75 12C1.75 6.33908 6.33908 1.75 12 1.75ZM8 11C7.44771 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11ZM12.001 11C11.4833 11 11.0572 11.3933 11.0059 11.8975L11.001 12L11.0059 12.1025C11.0572 12.6067 11.4833 13 12.001 13C12.5532 12.9999 13.001 12.5522 13.001 12C13.001 11.4821 12.607 11.0559 12.1025 11.0049L12.001 11ZM16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11Z",
          fill: "currentColor",
          key: "0",
        },
      ],
    ];
    var i = e.i(534341),
      o = e.i(838804),
      l = e.i(944636),
      d = e.i(143306),
      c = e.i(279081);
    let u = "Could we make this net 30? That matches our payment cycle.",
      h = "Of course. I’ve updated the payment terms to 30 days.",
      m = "The remaining balance is payable within 14 days of delivery.";
    e.s(
      [
        "CommentPreview",
        0,
        function () {
          let {
              ref: e,
              time: g,
              running: p,
              resetting: f,
              loopState: v,
              paused: _,
              togglePaused: w,
            } = (0, d.usePreviewTimeline)(21e3, 17e3),
            x = g >= 2e3,
            j = g >= 2600 && g < 5200,
            N = g >= 5200,
            y = g >= 7600,
            b = g >= 10400,
            $ = g >= 13e3 && g < 13160,
            C = g >= 13160,
            P = f
              ? "resetting"
              : C
                ? "resolved"
                : b
                  ? "updated"
                  : y
                    ? "replying"
                    : N
                      ? "commented"
                      : j
                        ? "composing"
                        : x
                          ? "selected"
                          : "reading";
          return (0, t.jsx)(l.PreviewFrame, {
            id: "comments",
            label: "Comment on contracts",
            containerRef: e,
            running: p,
            loopState: v,
            phase: P,
            paused: _,
            onTogglePaused: w,
            subtitle:
              "Discuss a clause, agree on a change, and resolve it right in the contract.",
            description:
              "A clause is selected, Alex requests a change, Sam replies, the payment term changes from 14 to 30 days, and the comment is resolved.",
            children: (0, t.jsxs)("div", {
              className: c.default.commentWorkspace,
              children: [
                (0, t.jsxs)("div", {
                  className: c.default.commentDocument,
                  children: [
                    (0, t.jsxs)("div", {
                      className: c.default.documentToolbar,
                      children: [
                        (0, t.jsx)("span", {
                          children: "Design services agreement",
                        }),
                        (0, t.jsxs)("span", {
                          className: `${c.default.saved} ${c.default.reveal}`,
                          "data-show": b,
                          children: [
                            (0, t.jsx)(s.Icon, { icon: i.CheckIcon }),
                            "Changes saved",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)("article", {
                      className: `contract ${c.default.paper} ${c.default.commentPaper}`,
                      children: [
                        (0, t.jsxs)("div", {
                          className: c.default.paperTitle,
                          children: [
                            (0, t.jsx)("h3", {
                              children: "Design services agreement",
                            }),
                            (0, t.jsx)("p", {
                              children: "Studio North & Acme",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: c.default.documentSection,
                          children: [
                            (0, t.jsx)("h4", { children: "1. Scope of work" }),
                            (0, t.jsx)("p", {
                              children:
                                "The Designer will create a visual identity and website design, including two rounds of revisions.",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: c.default.documentSection,
                          children: [
                            (0, t.jsx)("h4", {
                              children: "2. Fees and payment",
                            }),
                            (0, t.jsxs)("p", {
                              children: [
                                "The total project fee is ",
                                (0, t.jsx)("strong", { children: "$12,000" }),
                                ". A ",
                                (0, t.jsx)("strong", {
                                  children: "$6,000 deposit",
                                }),
                                " is due before work begins.",
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: c.default.clause,
                              "data-selected": x,
                              "data-updated": b,
                              children: [
                                (0, t.jsx)("div", {
                                  className: c.default.clauseHighlight,
                                }),
                                (0, t.jsxs)("div", {
                                  className: c.default.clauseText,
                                  children: [
                                    "The remaining balance is payable within ",
                                    (0, t.jsxs)("span", {
                                      className: c.default.changedTerm,
                                      children: [
                                        (0, t.jsx)("span", {
                                          "data-show": !b,
                                          children: "14 days",
                                        }),
                                        (0, t.jsx)("span", {
                                          "data-show": b,
                                          children: "30 days",
                                        }),
                                      ],
                                    }),
                                    " of delivery.",
                                  ],
                                }),
                                (0, t.jsxs)("span", {
                                  className: `${c.default.clauseMarker} ${c.default.reveal}`,
                                  "data-show": x,
                                  children: [
                                    (0, t.jsx)("span", {
                                      "data-show": !C,
                                      children: (0, t.jsx)(s.Icon, { icon: r }),
                                    }),
                                    (0, t.jsx)("span", {
                                      "data-show": C,
                                      children: (0, t.jsx)(s.Icon, {
                                        icon: i.CheckIcon,
                                      }),
                                    }),
                                  ],
                                }),
                                (0, t.jsx)(l.PreviewCursor, {
                                  visible: g >= 800 && g < 3e3,
                                  arrived: g >= 1600,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: c.default.documentSection,
                          children: [
                            (0, t.jsx)("h4", { children: "3. Timeline" }),
                            (0, t.jsxs)("p", {
                              children: [
                                "The project will be completed within ",
                                (0, t.jsx)("strong", { children: "six weeks" }),
                                " of receiving the deposit and project materials.",
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: c.default.documentSection,
                          children: [
                            (0, t.jsx)("h4", { children: "4. Ownership" }),
                            (0, t.jsx)("p", {
                              children:
                                "Ownership of the final approved designs transfers to the Client when payment is complete.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: c.default.commentSidebar,
                  children: [
                    (0, t.jsxs)("div", {
                      className: c.default.chatHeading,
                      children: [
                        (0, t.jsx)("span", { children: "Comments" }),
                        (0, t.jsx)("span", {
                          className: c.default.commentCount,
                          "data-show": N && !C,
                          children: "1 open",
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: c.default.threadStage,
                      children: [
                        (0, t.jsxs)("div", {
                          className: `${c.default.commentEmpty} ${c.default.reveal}`,
                          "data-show": g < 2600,
                          children: [
                            (0, t.jsx)(s.Icon, { icon: r, size: 24 }),
                            (0, t.jsxs)("p", {
                              children: [
                                "Select a clause.",
                                (0, t.jsx)("br", {}),
                                "Keep the conversation right here.",
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: `${c.default.commentCompose} ${c.default.reveal}`,
                          "data-show": j,
                          inert: !0,
                          children: [
                            (0, t.jsx)("div", {
                              className: `home-composer-rail ${c.default.cardRail}`,
                              "data-tone": "selection",
                              children: (0, t.jsx)(o.ComposerRail, {
                                label: "Selected section · 2. Fees and payment",
                                children: (0, t.jsx)("p", { children: m }),
                              }),
                            }),
                            (0, t.jsx)("textarea", {
                              readOnly: !0,
                              "aria-label": "Example comment",
                              value: (0, d.typed)(u, g, 3e3, 27),
                              placeholder: "Leave a comment…",
                            }),
                            (0, t.jsxs)("div", {
                              className: c.default.commentSend,
                              children: [
                                (0, t.jsx)("span", { children: "Alex Acme" }),
                                (0, t.jsxs)(a.Button, {
                                  size: "compact",
                                  variant: "primary",
                                  "data-pressed": g >= 5040 && g < 5200,
                                  children: [
                                    "Comment",
                                    (0, t.jsx)(s.Icon, { icon: n.ArrowUpIcon }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: `thread ${c.default.thread} ${c.default.reveal}`,
                          "data-show": N,
                          "data-resolved": C,
                          children: [
                            (0, t.jsx)("div", {
                              className: `home-composer-rail ${c.default.cardRail}`,
                              "data-tone": "selection",
                              children: (0, t.jsx)(o.ComposerRail, {
                                label: "Selected section · 2. Fees and payment",
                                children: (0, t.jsx)("p", { children: m }),
                              }),
                            }),
                            (0, t.jsxs)("div", {
                              className: "thread-meta",
                              children: [
                                (0, t.jsxs)("strong", {
                                  children: [
                                    "Alex ",
                                    (0, t.jsx)("span", { children: "Acme" }),
                                  ],
                                }),
                                (0, t.jsx)("span", { children: "Just now" }),
                              ],
                            }),
                            (0, t.jsx)("div", {
                              className: "thread-body",
                              children: u,
                            }),
                            (0, t.jsxs)("div", {
                              className: c.default.replyStage,
                              children: [
                                (0, t.jsx)(l.Thinking, {
                                  visible: g >= 6400 && !y,
                                  label: "Sam is replying…",
                                }),
                                (0, t.jsxs)("div", {
                                  className: `reply ${c.default.reveal}`,
                                  "data-show": y,
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "thread-meta",
                                      children: [
                                        (0, t.jsxs)("strong", {
                                          children: [
                                            "Sam ",
                                            (0, t.jsx)("span", {
                                              children: "Studio North",
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("span", {
                                          children: "Just now",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: c.default.answerStack,
                                      children: [
                                        (0, t.jsx)("div", {
                                          className: `thread-body ${c.default.measure}`,
                                          children: h,
                                        }),
                                        (0, t.jsx)("div", {
                                          className: "thread-body",
                                          children: (0, d.typed)(
                                            h,
                                            g,
                                            7600,
                                            24,
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: `${c.default.changeNote} ${c.default.reveal}`,
                              "data-show": b,
                              children: [
                                (0, t.jsx)(s.Icon, { icon: i.CheckIcon }),
                                (0, t.jsxs)("span", {
                                  children: [
                                    "Payment terms updated to ",
                                    (0, t.jsx)("strong", {
                                      children: "30 days",
                                    }),
                                    ".",
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: c.default.resolveStack,
                              inert: !0,
                              children: [
                                (0, t.jsx)("div", {
                                  className: c.default.resolveAction,
                                  "data-show": N && !C,
                                  children: (0, t.jsxs)(a.Button, {
                                    size: "compact",
                                    variant: "secondary",
                                    "data-pressed": $,
                                    children: [
                                      (0, t.jsx)(s.Icon, { icon: i.CheckIcon }),
                                      "Resolve",
                                    ],
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className: c.default.resolved,
                                  "data-show": C,
                                  children: [
                                    (0, t.jsx)(s.Icon, { icon: i.CheckIcon }),
                                    (0, t.jsx)("span", {
                                      children: "Resolved",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        },
      ],
      79975,
    );
  },
  169129,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(348978),
      s = e.i(320558),
      n = e.i(882805),
      r = e.i(534341),
      i = e.i(773157),
      o = e.i(195431),
      l = e.i(944636),
      d = e.i(143306),
      c = e.i(279081);
    let u =
        "Draft a design agreement with Acme. $12,000, six weeks, 50% upfront.",
      h = [
        { text: "I’ve drafted your agreement with a " },
        { text: "six-week timeline", emphasis: !0 },
        { text: ", a " },
        { text: "$6,000 deposit", emphasis: !0 },
        { text: ", and a " },
        { text: "$6,000 final payment", emphasis: !0 },
        { text: ". You can refine any section before sharing it." },
      ],
      m = [
        {
          at: 5600,
          markdown:
            "This agreement is between **Studio North** (the Designer) and **Acme** (the Client).",
        },
        {
          at: 6600,
          markdown:
            "#### 1. Scope of work\nThe Designer will create a visual identity and website design, including two rounds of revisions.",
        },
        {
          at: 7800,
          markdown:
            "#### 2. Fees and payment\nThe total project fee is **$12,000**. A **$6,000 deposit** is due before work begins. The remaining **$6,000** is due on delivery.",
        },
        {
          at: 9200,
          markdown:
            "#### 3. Timeline\nThe project will be completed within **six weeks** of receiving the deposit and project materials.",
        },
        {
          at: 10400,
          markdown:
            "#### 4. Ownership\nOwnership of the final approved designs transfers to the Client when payment is complete.",
        },
      ].map((e) => ({ ...e, blocks: (0, o.parseMarkdown)(e.markdown) }));
    e.s([
      "DraftPreview",
      0,
      function () {
        let {
            ref: e,
            time: o,
            running: g,
            resetting: p,
            loopState: f,
            paused: v,
            togglePaused: _,
          } = (0, d.usePreviewTimeline)(2e4, 16e3),
          w = o >= 3400 && o < 3560,
          x = o >= 3560,
          j = o >= 11600,
          N = p
            ? "resetting"
            : j
              ? "ready"
              : o >= 5200
                ? "drafting"
                : x
                  ? "opening"
                  : w
                    ? "sending"
                    : "prompt";
        return (0, t.jsx)(l.PreviewFrame, {
          id: "draft",
          label: "Draft with AI",
          containerRef: e,
          running: g,
          loopState: f,
          phase: N,
          paused: v,
          onTogglePaused: _,
          subtitle:
            "Describe what you need. Turn a few details into a draft you can refine.",
          description:
            "A prompt becomes a design services agreement, with the conversation on the left and the draft on the right.",
          children: (0, t.jsxs)("div", {
            className: c.default.draftStage,
            children: [
              (0, t.jsxs)("div", {
                className: c.default.launch,
                "data-show": !x,
                children: [
                  (0, t.jsxs)("div", {
                    className: c.default.intro,
                    children: [
                      (0, t.jsx)("h3", {
                        children: "Start with what you need.",
                      }),
                      (0, t.jsx)("p", {
                        children: "A few details. A first draft.",
                      }),
                    ],
                  }),
                  (0, t.jsx)(l.PreviewComposer, {
                    value: (0, d.typed)(u, o, 600, 32),
                    sending: w,
                    placeholder: "Describe the agreement you need…",
                  }),
                  (0, t.jsx)(l.SampleAgreements, { visible: o >= 160 }),
                ],
              }),
              (0, t.jsxs)("div", {
                className: c.default.draftWorkspace,
                "data-show": x,
                children: [
                  (0, t.jsxs)("div", {
                    className: c.default.draftChat,
                    children: [
                      (0, t.jsx)("div", {
                        className: c.default.chatHeading,
                        children: "Your conversation",
                      }),
                      (0, t.jsxs)("div", {
                        className: c.default.draftMessages,
                        children: [
                          (0, t.jsx)(l.UserMessage, {
                            visible: o >= 3800,
                            children: u,
                          }),
                          (0, t.jsxs)("div", {
                            className: c.default.responseStack,
                            children: [
                              (0, t.jsx)(l.Thinking, {
                                visible: o >= 4100 && o < 5200,
                                label: "Putting your draft together…",
                              }),
                              (0, t.jsx)("div", {
                                className:
                                  "home-message home-message--assistant",
                                children: (0, t.jsx)(l.StreamingAnswer, {
                                  parts: h,
                                  time: o,
                                  start: 5200,
                                  visible: o >= 5200,
                                }),
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: `${c.default.draftReady} ${c.default.reveal}`,
                            "data-show": j,
                            children: [
                              (0, t.jsx)(s.Icon, { icon: r.CheckIcon }),
                              (0, t.jsx)("span", {
                                children: "Ready for your review",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)(l.PreviewComposer, {
                        compact: !0,
                        busy: !j,
                        placeholder: "Make it yours. Ask for a change…",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: c.default.documentShell,
                    children: [
                      (0, t.jsxs)("div", {
                        className: c.default.documentToolbar,
                        children: [
                          (0, t.jsxs)("span", {
                            children: [
                              (0, t.jsx)(s.Icon, { icon: n.AgreementIcon }),
                              "Your draft",
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: c.default.statusStack,
                            children: [
                              (0, t.jsx)("span", {
                                "data-show": !j,
                                children: "Drafting…",
                              }),
                              (0, t.jsxs)("span", {
                                className: c.default.saved,
                                "data-show": j,
                                children: [
                                  (0, t.jsx)(s.Icon, { icon: r.CheckIcon }),
                                  "Saved",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsxs)("article", {
                        className: `contract ${c.default.paper}`,
                        children: [
                          (0, t.jsxs)("div", {
                            className: `${c.default.paperTitle} ${c.default.reveal}`,
                            "data-show": o >= 5e3,
                            children: [
                              (0, t.jsx)("h3", {
                                children: "Design services agreement",
                              }),
                              (0, t.jsx)("p", {
                                children: "Studio North & Acme",
                              }),
                            ],
                          }),
                          m.map((e) =>
                            (0, t.jsx)(
                              "div",
                              {
                                className: `${c.default.documentSection} ${c.default.reveal}`,
                                "data-show": o >= e.at,
                                children: (0, t.jsx)(i.MarkdownView, {
                                  blocks: e.blocks,
                                }),
                              },
                              e.at,
                            ),
                          ),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: `${c.default.documentFooter} ${c.default.reveal}`,
                        "data-show": j,
                        inert: !0,
                        children: [
                          (0, t.jsx)("span", {
                            children: "Your draft is ready.",
                          }),
                          (0, t.jsx)(a.Button, {
                            variant: "secondary",
                            size: "compact",
                            children: "Review draft",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      },
    ]);
  },
  775929,
  (e) => {
    "use strict";
    var t = e.i(843476),
      a = e.i(320558),
      s = e.i(882805),
      n = e.i(944636),
      r = e.i(143306),
      i = e.i(279081);
    let o = "When does our agreement with Acme renew?",
      l = [
        { text: "Your agreement with Acme renews on " },
        { text: "December 1", emphasis: !0 },
        { text: ". It renews for " },
        { text: "another year", emphasis: !0 },
        { text: " unless either party gives " },
        { text: "30 days’ notice", emphasis: !0 },
        { text: "." },
      ];
    e.s([
      "QuestionPreview",
      0,
      function () {
        let {
            ref: e,
            time: d,
            running: c,
            resetting: u,
            loopState: h,
            paused: m,
            togglePaused: g,
          } = (0, r.usePreviewTimeline)(16e3, 12e3),
          p = d >= 3e3 && d < 3160,
          f = d >= 3160,
          v = f && d < 4560,
          _ = u
            ? "resetting"
            : d >= 7800
              ? "complete"
              : d >= 4560
                ? "answering"
                : v
                  ? "thinking"
                  : p
                    ? "sending"
                    : "prompt";
        return (0, t.jsx)(n.PreviewFrame, {
          id: "questions",
          label: "Ask your contracts",
          containerRef: e,
          running: c,
          loopState: h,
          phase: _,
          paused: m,
          onTogglePaused: g,
          subtitle:
            "Find dates, details, and answers in your agreements, with the source at hand.",
          description:
            "Terms answers a question about an existing agreement and shows the clause supporting its answer.",
          children: (0, t.jsxs)("div", {
            className: i.default.questionWorkspace,
            "data-sent": f,
            children: [
              (0, t.jsxs)("div", {
                className: i.default.questionStage,
                children: [
                  (0, t.jsxs)("div", {
                    className: `${i.default.intro} ${i.default.reveal}`,
                    "data-show": !f && !p,
                    children: [
                      (0, t.jsx)("h3", {
                        children: "Your agreements have answers.",
                      }),
                      (0, t.jsx)("p", {
                        children:
                          "Ask a question. Get straight to the relevant clause.",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: i.default.messages,
                    children: [
                      (0, t.jsx)(n.UserMessage, { visible: f, children: o }),
                      (0, t.jsxs)("div", {
                        className: i.default.responseStack,
                        children: [
                          (0, t.jsx)(n.Thinking, {
                            visible: v,
                            label: "Reading your agreement…",
                          }),
                          (0, t.jsx)("div", {
                            className: "home-message home-message--assistant",
                            children: (0, t.jsx)(n.StreamingAnswer, {
                              parts: l,
                              time: d,
                              start: 4560,
                              visible: d >= 4560,
                            }),
                          }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: `${i.default.citation} ${i.default.reveal}`,
                        "data-show": d >= 7800,
                        children: [
                          (0, t.jsxs)("div", {
                            className: i.default.citationHeading,
                            children: [
                              (0, t.jsx)(a.Icon, {
                                icon: s.AgreementIcon,
                                size: 20,
                              }),
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("h4", {
                                    children: "Consulting agreement",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: i.default.citationSection,
                                    children: "Acme · Section 4",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("blockquote", {
                            children: [
                              "“This agreement renews on ",
                              (0, t.jsx)("strong", { children: "December 1" }),
                              " for successive one-year terms, unless either party gives ",
                              (0, t.jsx)("strong", {
                                children: "30 days’ written notice",
                              }),
                              ".”",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                className: i.default.questionComposer,
                children: (0, t.jsx)(n.PreviewComposer, {
                  value: f ? "" : (0, r.typed)(o, d, 600, 35),
                  sending: p,
                  busy: v,
                  placeholder: "Ask about an agreement…",
                }),
              }),
            ],
          }),
        });
      },
    ]);
  },
]);
