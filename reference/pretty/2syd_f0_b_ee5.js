(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  19130,
  (e) => {
    "use strict";
    var t = e.i(843476),
      i = e.i(271645);
    let n = [
        {
          muted: !0,
          segments: [
            { text: "Sta" },
            { text: "r", kern: !0 },
            { text: "t a dra" },
            { text: "f", kern: !0 },
            { text: "t with AI." },
          ],
        },
        { muted: !0, segments: [{ text: "Chat about any contract." }] },
        {
          muted: !0,
          segments: [
            { text: "Comment with counterpa" },
            { text: "r", kern: !0 },
            { text: "ties." },
          ],
        },
        { segments: [{ text: "You’ll never open DocuSign again." }] },
      ],
      r = {
        completionDelay: 1200,
        lines: [
          { delay: 240, duration: 700 },
          { delay: 220, duration: 760 },
          { delay: 220, duration: 880 },
          { delay: 460, duration: 1e3 },
        ],
      },
      a = (e) => e.segments.map((e) => e.text).join(""),
      l = (e) => [...a(e)].length;
    e.s([
      "DEFAULT_TIMING",
      0,
      r,
      "HOME_LINES",
      0,
      n,
      "HeroHeadline",
      0,
      function ({ lines: e = n, timing: o = r, children: s }) {
        let d = JSON.stringify(e),
          u = (0, i.useMemo)(() => e, [d]),
          [c, f] = (0, i.useState)(() => ({
            counts: e.map(() => 0),
            done: !1,
          }));
        return (
          (0, i.useEffect)(() => {
            let e = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches,
              t = { counts: u.map(l), done: !0 },
              i = 0,
              n = "",
              r = performance.now(),
              a = (s) => {
                var d;
                let c,
                  p = e
                    ? t
                    : ((d = s - r),
                      (c = 0),
                      {
                        counts: u.map((e, t) => {
                          let i = l(e),
                            n = o.lines[t] ?? {
                              delay: 220,
                              duration: Math.max(400, 32 * i),
                            },
                            r = c + n.delay;
                          return ((c = r + n.duration), d < r)
                            ? 0
                            : Math.min(
                                i,
                                Math.floor(((d - r) / n.duration) * i) + 1,
                              );
                        }),
                        done: d >= c + o.completionDelay,
                      }),
                  m = `${p.counts.join(",")}|${p.done}`;
                (m !== n && ((n = m), f(p)),
                  p.done || (i = requestAnimationFrame(a)));
              };
            return (
              (i = requestAnimationFrame(a)),
              () => cancelAnimationFrame(i)
            );
          }, [o, u]),
          (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)("h1", {
                className: "landing-headline",
                "aria-label": u.map(a).join(" "),
                children: u.map((e, i) => {
                  let n, r, a;
                  return (0, t.jsx)(
                    "span",
                    {
                      className: `landing-headline-line${e.muted ? " landing-headline-brand" : ""}`,
                      children:
                        ((n = c.counts[i] ?? 0),
                        (r = []),
                        (a = []),
                        e.segments.forEach((e, i) => {
                          let l = Math.max(0, Math.min(e.text.length, n));
                          n -= l;
                          let o = e.text.slice(0, l),
                            s = e.text.slice(l);
                          (o &&
                            r.push(
                              e.kern
                                ? (0, t.jsx)(
                                    "span",
                                    { className: "landing-kern", children: o },
                                    `s${i}`,
                                  )
                                : o,
                            ),
                            s &&
                              a.push(
                                e.kern
                                  ? (0, t.jsx)(
                                      "span",
                                      {
                                        className: "landing-kern",
                                        children: s,
                                      },
                                      `h${i}`,
                                    )
                                  : s,
                              ));
                        }),
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            r,
                            a.length > 0 &&
                              (0, t.jsx)("span", {
                                className: "landing-headline-tail",
                                children: a,
                              }),
                          ],
                        })),
                    },
                    i,
                  );
                }),
              }),
              void 0 !== s &&
                (0, t.jsx)("div", {
                  className: "landing-cta landing-chips",
                  "data-show": c.done,
                  children: s,
                }),
            ],
          })
        );
      },
    ]);
  },
  603943,
  (e) => {
    "use strict";
    var t = e.i(843476),
      i = e.i(271645),
      n = e.i(451769),
      r = e.i(19130);
    let a = (e) => ({
        delay: [r.DEFAULT_TIMING.lines[e].delay, 0, 3e3, 10],
        duration: [r.DEFAULT_TIMING.lines[e].duration, 100, 5e3, 10],
      }),
      l = {
        completionDelay: [r.DEFAULT_TIMING.completionDelay, 0, 4e3, 50],
        "Start a draft": a(0),
        "Chat about": a(1),
        "Comment with": a(2),
        "You’ll never": a(3),
        replay: { type: "action" },
      };
    e.s([
      "HeroHeadlineDials",
      0,
      function ({ lines: e, children: a }) {
        let [o, s] = (0, i.useState)(0),
          d = (0, n.useDialKit)("Hero headline", l, {
            id: "hero-headline",
            persist: !0,
            onAction: () => s((e) => e + 1),
          }),
          u = (0, i.useMemo)(
            () => ({
              completionDelay: d.completionDelay,
              lines: [
                d["Start a draft"],
                d["Chat about"],
                d["Comment with"],
                d["You’ll never"],
              ].map((e) => ({ delay: e.delay, duration: e.duration })),
            }),
            [d],
          );
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(r.HeroHeadline, { lines: e, timing: u, children: a }, o),
            (0, t.jsx)(n.DialRoot, { position: "top-right", theme: "light" }),
          ],
        });
      },
    ]);
  },
  222290,
  (e) => {
    "use strict";
    var t = e.i(843476),
      i = e.i(271645),
      n = e.i(657688);
    let r = [
      { dx: -0.9, dy: 0.15, rot: -8 },
      { dx: 0.05, dy: -0.1, rot: 2 },
      { dx: 0.95, dy: 0.2, rot: 7 },
    ];
    e.s([
      "PhotoStack",
      0,
      function ({ photos: e }) {
        let [a, l] = (0, i.useState)(() => e.map((e, t) => t)),
          o = a[a.length - 1];
        return (0, t.jsx)("div", {
          className: "photo-stack",
          role: "group",
          "aria-label": "Photos of the studio",
          children: e.map((e, i) => {
            let s = r[i % r.length],
              d = a.indexOf(i);
            return (0, t.jsx)(
              "button",
              {
                type: "button",
                className: "photo-stack-card",
                "data-front": i === o ? "" : void 0,
                "aria-label":
                  i === o
                    ? "Show the next photo"
                    : "Bring this photo to the front",
                style: {
                  zIndex: d + 1,
                  "--dx": s.dx,
                  "--dy": s.dy,
                  "--rot": `${s.rot}deg`,
                  "--depth": d,
                  "--w": e.scale ?? 1,
                  "--aspect": e.aspect,
                },
                onClick: () => {
                  l((e) =>
                    i === o
                      ? [e[e.length - 1], ...e.slice(0, -1)]
                      : [...e.filter((e) => e !== i), i],
                  );
                },
                children: (0, t.jsx)(n.default, {
                  src: e.src,
                  alt: e.alt,
                  sizes: "(max-width: 600px) 60vw, 300px",
                  placeholder: "blur",
                  draggable: !1,
                }),
              },
              e.src.src,
            );
          }),
        });
      },
    ]);
  },
  299007,
  (e) => {
    "use strict";
    var t = e.i(843476),
      i = e.i(271645);
    e.s([
      "PillRail",
      0,
      function ({
        activeKey: e,
        labels: n,
        children: r,
        followHover: a = !1,
        size: l = "compact",
        clip: o = !0,
      }) {
        let s = (0, i.useRef)(null),
          d = n.findIndex((t) => t.key === e);
        return (
          (0, i.useLayoutEffect)(() => {
            let e = s.current;
            if (!e) return;
            let t = e.querySelector(".pill-navigation-links"),
              i = [
                ...e.querySelectorAll(".pill-navigation-links .action-button"),
              ],
              n = e.querySelectorAll(".pill-navigation-copy-item"),
              r =
                i[d] ??
                e.querySelector(
                  '.pill-navigation-links [aria-current="page"], .pill-navigation-links [aria-selected="true"]',
                ),
              l = null,
              o = null;
            function u(t = !1) {
              if (!e) return;
              let a = l ?? o ?? r;
              if (
                (i.forEach((e) =>
                  e.toggleAttribute("data-pill-active", e === a),
                ),
                !a)
              )
                return void delete e.dataset.active;
              let s = e.getBoundingClientRect(),
                d = s.width / Number.parseFloat(getComputedStyle(e).width) || 1,
                c = a.getBoundingClientRect();
              (e.style.setProperty("--nav-left", `${(c.left - s.left) / d}px`),
                e.style.setProperty(
                  "--nav-right",
                  `${(s.right - c.right) / d}px`,
                ),
                e.style.setProperty("--nav-width", `${c.width / d}px`),
                i.forEach((e, t) => {
                  let i = n[t];
                  if (!i) return;
                  let r = e.getBoundingClientRect();
                  ((i.style.left = `${(r.left - s.left) / d}px`),
                    (i.style.width = `${r.width / d}px`),
                    (i.style.height = `${r.height / d}px`));
                }),
                (e.dataset.active = "true"));
              let f = e.parentElement;
              if (f && t) {
                let e = f.getBoundingClientRect();
                c.left < e.left + 4
                  ? (f.scrollLeft -= e.left + 4 - c.left)
                  : c.right > e.right - 4 &&
                    (f.scrollLeft += c.right - e.right + 4);
              }
            }
            function c(e) {
              let i = e instanceof Element ? e.closest(".action-button") : null;
              return i &&
                t?.contains(i) &&
                !i.matches(":disabled, [aria-disabled='true']")
                ? i
                : null;
            }
            function f(t) {
              "touch" !== t.pointerType &&
                ((l = c(t.target)), delete e.dataset.instant, u());
            }
            function p() {
              ((l = null), u());
            }
            function m(t) {
              let i = c(t.target);
              i?.matches(":focus-visible") &&
                ((o = i), (l = null), (e.dataset.instant = "true"), u());
            }
            function g(e) {
              ((o = c(e.relatedTarget)), u());
            }
            u(!0);
            let h = new ResizeObserver(() => u(!a));
            for (let t of (h.observe(e),
            e.parentElement && h.observe(e.parentElement),
            e.querySelectorAll(".pill-navigation-links .action-button")))
              h.observe(t);
            a &&
              (e.addEventListener("pointerover", f),
              e.addEventListener("pointerleave", p),
              e.addEventListener("focusin", m),
              e.addEventListener("focusout", g));
            let y = requestAnimationFrame(() => {
              e.dataset.animated = "true";
            });
            return () => {
              (h.disconnect(),
                cancelAnimationFrame(y),
                e.removeEventListener("pointerover", f),
                e.removeEventListener("pointerleave", p),
                e.removeEventListener("focusin", m),
                e.removeEventListener("focusout", g));
            };
          }, [e, d, n.length, a]),
          (0, t.jsxs)("div", {
            className: "pill-navigation-rail",
            ref: s,
            "data-clip": o ? void 0 : "off",
            onKeyDownCapture: () => {
              s.current && (s.current.dataset.instant = "true");
            },
            onPointerDownCapture: () => {
              s.current && delete s.current.dataset.instant;
            },
            children: [
              (0, t.jsx)("div", {
                className: "pill-navigation-links",
                children: r,
              }),
              (0, t.jsx)("div", {
                className: "pill-navigation-highlight",
                "aria-hidden": "true",
              }),
              o &&
                (0, t.jsx)("div", {
                  className: "pill-navigation-active-copy",
                  "aria-hidden": "true",
                  inert: !0,
                  children: n.map((e) =>
                    (0, t.jsx)(
                      "span",
                      {
                        className: `action-button action-button--ghost action-button--${l} pill-navigation-copy-item`,
                        children: e.content,
                      },
                      e.key,
                    ),
                  ),
                }),
            ],
          })
        );
      },
    ]);
  },
  605500,
  (e, t, i) => {
    "use strict";
    (e.i(247167),
      Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "Image", {
        enumerable: !0,
        get: function () {
          return w;
        },
      }));
    let n = e.r(555682),
      r = e.r(190809),
      a = e.r(843476),
      l = r._(e.r(271645)),
      o = n._(e.r(174080)),
      s = n._(e.r(325633)),
      d = e.r(908927),
      u = e.r(987690),
      c = e.r(918556),
      f = e.r(65856),
      p = n._(e.r(1948)),
      m = e.r(818581),
      g = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        qualities: [75],
        path: "/_next/image",
        loader: "default",
        dangerouslyAllowSVG: !1,
        unoptimized: !1,
      };
    function h(e, t, i, n, r, a, l) {
      let o = e?.src;
      e &&
        e["data-loaded-src"] !== o &&
        ((e["data-loaded-src"] = o),
        ("decode" in e ? e.decode() : Promise.resolve())
          .catch(() => {})
          .then(() => {
            if (e.parentElement && e.isConnected) {
              if (("empty" !== t && r(!0), i?.current)) {
                let t = new Event("load");
                Object.defineProperty(t, "target", { writable: !1, value: e });
                let n = !1,
                  r = !1;
                i.current({
                  ...t,
                  nativeEvent: t,
                  currentTarget: e,
                  target: e,
                  isDefaultPrevented: () => n,
                  isPropagationStopped: () => r,
                  persist: () => {},
                  preventDefault: () => {
                    ((n = !0), t.preventDefault());
                  },
                  stopPropagation: () => {
                    ((r = !0), t.stopPropagation());
                  },
                });
              }
              n?.current && n.current(e);
            }
          }));
    }
    function y(e) {
      return l.use ? { fetchPriority: e } : { fetchpriority: e };
    }
    "u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    let v = "u" < typeof window ? l.useEffect : l.useLayoutEffect,
      b = (0, l.forwardRef)(
        (
          {
            src: e,
            srcSet: t,
            sizes: i,
            height: n,
            width: r,
            decoding: o,
            className: s,
            style: d,
            fetchPriority: u,
            placeholder: c,
            loading: f,
            unoptimized: p,
            fill: g,
            onLoadRef: b,
            onLoadingCompleteRef: x,
            setBlurComplete: w,
            setShowAltText: _,
            sizesInput: j,
            onLoad: E,
            onError: S,
            ...P
          },
          C,
        ) => {
          let O = (0, l.useRef)(!1),
            R = (0, l.useRef)(null);
          v(() => {
            let { current: e } = O,
              { current: t } = R;
            e ||
              null === t ||
              (S && (t.src = t.src),
              t.complete && h(t, c, b, x, w, p, j),
              (O.current = !0));
          }, [e, c, b, x, S, p, j]);
          let M = (0, m.useMergedRef)(C, R);
          return (0, a.jsx)("img", {
            ...P,
            ...y(u),
            loading: f,
            width: r,
            height: n,
            decoding: o,
            "data-nimg": g ? "fill" : "1",
            className: s,
            style: d,
            sizes: i,
            srcSet: t,
            src: e,
            ref: M,
            onLoad: (e) => {
              h(e.currentTarget, c, b, x, w, p, j);
            },
            onError: (e) => {
              (_(!0), "empty" !== c && w(!0), S && S(e));
            },
          });
        },
      );
    function x({ isAppRouter: e, imgAttributes: t }) {
      let i = {
        as: "image",
        imageSrcSet: t.srcSet,
        imageSizes: t.sizes,
        crossOrigin: t.crossOrigin,
        referrerPolicy: t.referrerPolicy,
        ...y(t.fetchPriority),
      };
      return e && o.default.preload
        ? (o.default.preload(t.src, i), null)
        : (0, a.jsx)(s.default, {
            children: (0, a.jsx)(
              "link",
              { rel: "preload", href: t.srcSet ? void 0 : t.src, ...i },
              "__nimg-" + t.src + t.srcSet + t.sizes,
            ),
          });
    }
    let w = (0, l.forwardRef)((e, t) => {
      let i = (0, l.useContext)(f.RouterContext),
        n = (0, l.useContext)(c.ImageConfigContext),
        r = (0, l.useMemo)(() => {
          let e = g || n || u.imageConfigDefault,
            t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
            i = e.deviceSizes.sort((e, t) => e - t),
            r = e.qualities?.sort((e, t) => e - t);
          return {
            ...e,
            allSizes: t,
            deviceSizes: i,
            qualities: r,
            localPatterns:
              "u" < typeof window ? n?.localPatterns : e.localPatterns,
          };
        }, [n]),
        { onLoad: o, onLoadingComplete: s } = e,
        m = (0, l.useRef)(o);
      (0, l.useEffect)(() => {
        m.current = o;
      }, [o]);
      let h = (0, l.useRef)(s);
      (0, l.useEffect)(() => {
        h.current = s;
      }, [s]);
      let [y, v] = (0, l.useState)(!1),
        [w, _] = (0, l.useState)(!1),
        { props: j, meta: E } = (0, d.getImgProps)(e, {
          defaultLoader: p.default,
          imgConf: r,
          blurComplete: y,
          showAltText: w,
        });
      return (0, a.jsxs)(a.Fragment, {
        children: [
          (0, a.jsx)(b, {
            ...j,
            unoptimized: E.unoptimized,
            placeholder: E.placeholder,
            fill: E.fill,
            onLoadRef: m,
            onLoadingCompleteRef: h,
            setBlurComplete: v,
            setShowAltText: _,
            sizesInput: e.sizes,
            ref: t,
          }),
          E.preload
            ? (0, a.jsx)(x, { isAppRouter: !i, imgAttributes: j })
            : null,
        ],
      });
    });
    ("function" == typeof i.default ||
      ("object" == typeof i.default && null !== i.default)) &&
      void 0 === i.default.__esModule &&
      (Object.defineProperty(i.default, "__esModule", { value: !0 }),
      Object.assign(i.default, i),
      (t.exports = i.default));
  },
  670965,
  (e, t, i) => {
    "use strict";
    function n(e, t) {
      let i = e || 75;
      return t?.qualities?.length
        ? t.qualities.reduce(
            (e, t) => (Math.abs(t - i) < Math.abs(e - i) ? t : e),
            t.qualities[0],
          )
        : i;
    }
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "findClosestQuality", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  908927,
  (e, t, i) => {
    "use strict";
    (e.i(247167),
      Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "getImgProps", {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
    let n = e.r(543369),
      r = e.r(488143),
      a = e.r(987690),
      l = ["-moz-initial", "fill", "none", "scale-down", void 0];
    function o(e) {
      return void 0 !== e.default;
    }
    function s(e) {
      return void 0 === e
        ? e
        : "number" == typeof e
          ? Number.isFinite(e)
            ? e
            : NaN
          : "string" == typeof e && /^[0-9]+$/.test(e)
            ? parseInt(e, 10)
            : NaN;
    }
    function d(
      {
        src: e,
        sizes: t,
        unoptimized: i = !1,
        priority: u = !1,
        preload: c = !1,
        loading: f,
        className: p,
        quality: m,
        width: g,
        height: h,
        fill: y = !1,
        style: v,
        overrideSrc: b,
        onLoad: x,
        onLoadingComplete: w,
        placeholder: _ = "empty",
        blurDataURL: j,
        fetchPriority: E,
        decoding: S = "async",
        layout: P,
        objectFit: C,
        objectPosition: O,
        lazyBoundary: R,
        lazyRoot: M,
        ...I
      },
      D,
    ) {
      var k;
      let $,
        z,
        A,
        { imgConf: N, showAltText: L, blurComplete: T, defaultLoader: F } = D,
        q = N || a.imageConfigDefault;
      if ("allSizes" in q) $ = q;
      else {
        let e = [...q.deviceSizes, ...q.imageSizes].sort((e, t) => e - t),
          t = q.deviceSizes.sort((e, t) => e - t),
          i = q.qualities?.sort((e, t) => e - t);
        $ = { ...q, allSizes: e, deviceSizes: t, qualities: i };
      }
      if (void 0 === F)
        throw Object.defineProperty(
          Error(
            "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E163", enumerable: !1, configurable: !0 },
        );
      let U = I.loader || F;
      (delete I.loader, delete I.srcSet);
      let B = "__next_img_default" in U;
      if (B) {
        if ("custom" === $.loader)
          throw Object.defineProperty(
            Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),
            "__NEXT_ERROR_CODE",
            { value: "E252", enumerable: !1, configurable: !0 },
          );
      } else {
        let e = U;
        U = (t) => {
          let { config: i, ...n } = t;
          return e(n);
        };
      }
      if (P) {
        "fill" === P && (y = !0);
        let e = {
          intrinsic: { maxWidth: "100%", height: "auto" },
          responsive: { width: "100%", height: "auto" },
        }[P];
        e && (v = { ...v, ...e });
        let i = { responsive: "100vw", fill: "100vw" }[P];
        i && !t && (t = i);
      }
      let G = "",
        H = s(g),
        W = s(h);
      if ((k = e) && "object" == typeof k && (o(k) || void 0 !== k.src)) {
        let t = o(e) ? e.default : e;
        if (!t.src)
          throw Object.defineProperty(
            Error(
              `An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E460", enumerable: !1, configurable: !0 },
          );
        if (!t.height || !t.width)
          throw Object.defineProperty(
            Error(
              `An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E48", enumerable: !1, configurable: !0 },
          );
        if (
          ((z = t.blurWidth),
          (A = t.blurHeight),
          (j = j || t.blurDataURL),
          (G = t.src),
          !y)
        )
          if (H || W) {
            if (H && !W) {
              let e = H / t.width;
              W = Math.round(t.height * e);
            } else if (!H && W) {
              let e = W / t.height;
              H = Math.round(t.width * e);
            }
          } else ((H = t.width), (W = t.height));
      }
      let X = !u && !c && ("lazy" === f || void 0 === f);
      ((!(e = "string" == typeof e ? e : G) ||
        e.startsWith("data:") ||
        e.startsWith("blob:")) &&
        ((i = !0), (X = !1)),
        $.unoptimized && (i = !0),
        B &&
          !$.dangerouslyAllowSVG &&
          e.split("?", 1)[0].endsWith(".svg") &&
          (i = !0));
      let V = s(m),
        Y = Object.assign(
          y
            ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: C,
                objectPosition: O,
              }
            : {},
          L ? {} : { color: "transparent" },
          v,
        ),
        K =
          T || "empty" === _
            ? null
            : "blur" === _
              ? `url("data:image/svg+xml;charset=utf-8,${(0, r.getImageBlurSvg)({ widthInt: H, heightInt: W, blurWidth: z, blurHeight: A, blurDataURL: j || "", objectFit: Y.objectFit })}")`
              : `url("${_}")`,
        J = l.includes(Y.objectFit)
          ? "fill" === Y.objectFit
            ? "100% 100%"
            : "cover"
          : Y.objectFit,
        Q = K
          ? {
              backgroundSize: J,
              backgroundPosition: Y.objectPosition || "50% 50%",
              backgroundRepeat: "no-repeat",
              backgroundImage: K,
            }
          : {},
        Z = (function ({
          config: e,
          src: t,
          unoptimized: i,
          width: r,
          quality: a,
          sizes: l,
          loader: o,
        }) {
          if (i) {
            if (t.startsWith("/") && !t.startsWith("//")) {
              let e = (0, n.getDeploymentId)();
              if (
                t.includes("/_next/static/immutable") &&
                !(0, n.getAssetToken)()
              )
                e = void 0;
              else if (e) {
                let i = t.indexOf("?");
                if (-1 !== i) {
                  let n = new URLSearchParams(t.slice(i + 1));
                  n.get("dpl") ||
                    (n.append("dpl", e),
                    (t = t.slice(0, i) + "?" + n.toString()));
                } else t += `?dpl=${e}`;
              }
            }
            return { src: t, srcSet: void 0, sizes: void 0 };
          }
          let { widths: s, kind: d } = (function (
              { deviceSizes: e, allSizes: t },
              i,
              n,
            ) {
              if (n) {
                let i = /(^|\s)(1?\d?\d)vw/g,
                  r = [];
                for (let e; (e = i.exec(n));) r.push(parseInt(e[2]));
                if (r.length) {
                  let i = 0.01 * Math.min(...r);
                  return { widths: t.filter((t) => t >= e[0] * i), kind: "w" };
                }
                return { widths: t, kind: "w" };
              }
              return "number" != typeof i
                ? { widths: e, kind: "w" }
                : {
                    widths: [
                      ...new Set(
                        [i, 2 * i].map(
                          (e) => t.find((t) => t >= e) || t[t.length - 1],
                        ),
                      ),
                    ],
                    kind: "x",
                  };
            })(e, r, l),
            u = s.length - 1;
          return {
            sizes: l || "w" !== d ? l : "100vw",
            srcSet: s
              .map(
                (i, n) =>
                  `${o({ config: e, src: t, quality: a, width: i })} ${"w" === d ? i : n + 1}${d}`,
              )
              .join(", "),
            src: o({ config: e, src: t, quality: a, width: s[u] }),
          };
        })({
          config: $,
          src: e,
          unoptimized: i,
          width: H,
          quality: V,
          sizes: t,
          loader: U,
        }),
        ee = X ? "lazy" : f;
      return {
        props: {
          ...I,
          loading: ee,
          fetchPriority: E,
          width: H,
          height: W,
          decoding: S,
          className: p,
          style: { ...Y, ...Q },
          sizes: Z.sizes,
          srcSet: Z.srcSet,
          src: b || Z.src,
        },
        meta: { unoptimized: i, preload: c || u, placeholder: _, fill: y },
      };
    }
  },
  325633,
  (e, t, i) => {
    "use strict";
    (e.i(247167), Object.defineProperty(i, "__esModule", { value: !0 }));
    var n = {
      default: function () {
        return g;
      },
      defaultHead: function () {
        return c;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let a = e.r(555682),
      l = e.r(190809),
      o = e.r(843476),
      s = l._(e.r(271645)),
      d = a._(e.r(898879)),
      u = e.r(742732);
    function c() {
      return [
        (0, o.jsx)("meta", { charSet: "utf-8" }, "charset"),
        (0, o.jsx)(
          "meta",
          { name: "viewport", content: "width=device-width" },
          "viewport",
        ),
      ];
    }
    function f(e, t) {
      return "string" == typeof t || "number" == typeof t
        ? e
        : t.type === s.default.Fragment
          ? e.concat(
              s.default.Children.toArray(t.props.children).reduce(
                (e, t) =>
                  "string" == typeof t || "number" == typeof t
                    ? e
                    : e.concat(t),
                [],
              ),
            )
          : e.concat(t);
    }
    let p = ["name", "httpEquiv", "charSet", "itemProp"];
    function m(e) {
      let t, i, n, r;
      return e
        .reduce(f, [])
        .reverse()
        .concat(c().reverse())
        .filter(
          ((t = new Set()),
          (i = new Set()),
          (n = new Set()),
          (r = {}),
          (e) => {
            let a = !0,
              l = !1;
            if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
              l = !0;
              let i = e.key.slice(e.key.indexOf("$") + 1);
              t.has(i) ? (a = !1) : t.add(i);
            }
            switch (e.type) {
              case "title":
              case "base":
                i.has(e.type) ? (a = !1) : i.add(e.type);
                break;
              case "meta":
                for (let t = 0, i = p.length; t < i; t++) {
                  let i = p[t];
                  if (e.props.hasOwnProperty(i))
                    if ("charSet" === i) n.has(i) ? (a = !1) : n.add(i);
                    else {
                      let t = e.props[i],
                        n = r[i] || new Set();
                      ("name" !== i || !l) && n.has(t)
                        ? (a = !1)
                        : (n.add(t), (r[i] = n));
                    }
                }
            }
            return a;
          }),
        )
        .reverse()
        .map((e, t) => {
          let i = e.key || t;
          return s.default.cloneElement(e, { key: i });
        });
    }
    let g = function ({ children: e }) {
      let t = (0, s.useContext)(u.HeadManagerContext);
      return (0, o.jsx)(d.default, {
        reduceComponentsToState: m,
        headManager: t,
        children: e,
      });
    };
    ("function" == typeof i.default ||
      ("object" == typeof i.default && null !== i.default)) &&
      void 0 === i.default.__esModule &&
      (Object.defineProperty(i.default, "__esModule", { value: !0 }),
      Object.assign(i.default, i),
      (t.exports = i.default));
  },
  488143,
  (e, t, i) => {
    "use strict";
    function n({
      widthInt: e,
      heightInt: t,
      blurWidth: i,
      blurHeight: r,
      blurDataURL: a,
      objectFit: l,
    }) {
      let o = i ? 40 * i : e,
        s = r ? 40 * r : t,
        d = o && s ? `viewBox='0 0 ${o} ${s}'` : "";
      return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d ? "none" : "contain" === l ? "xMidYMid" : "cover" === l ? "xMidYMid slice" : "none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`;
    }
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "getImageBlurSvg", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
  },
  918556,
  (e, t, i) => {
    "use strict";
    (e.i(247167),
      Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "ImageConfigContext", {
        enumerable: !0,
        get: function () {
          return a;
        },
      }));
    let n = e.r(555682)._(e.r(271645)),
      r = e.r(987690),
      a = n.default.createContext(r.imageConfigDefault);
  },
  987690,
  (e, t, i) => {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var n = {
      VALID_LOADERS: function () {
        return a;
      },
      imageConfigDefault: function () {
        return l;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let a = ["default", "imgix", "cloudinary", "akamai", "custom"],
      l = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        path: "/_next/image",
        loader: "default",
        loaderFile: "",
        domains: [],
        disableStaticImages: !1,
        minimumCacheTTL: 14400,
        formats: ["image/webp"],
        maximumDiskCacheSize: void 0,
        maximumRedirects: 3,
        maximumResponseBody: 5e7,
        dangerouslyAllowLocalIP: !1,
        dangerouslyAllowSVG: !1,
        contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
        contentDispositionType: "attachment",
        localPatterns: void 0,
        remotePatterns: [],
        qualities: [75],
        unoptimized: !1,
        customCacheHandler: !1,
      };
  },
  794909,
  (e, t, i) => {
    "use strict";
    (e.i(247167), Object.defineProperty(i, "__esModule", { value: !0 }));
    var n = {
      default: function () {
        return u;
      },
      getImageProps: function () {
        return d;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let a = e.r(555682),
      l = e.r(908927),
      o = e.r(605500),
      s = a._(e.r(1948));
    function d(e) {
      let { props: t } = (0, l.getImgProps)(e, {
        defaultLoader: s.default,
        imgConf: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [32, 48, 64, 96, 128, 256, 384],
          qualities: [75],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !1,
        },
      });
      for (let [e, i] of Object.entries(t)) void 0 === i && delete t[e];
      return { props: t };
    }
    let u = o.Image;
  },
  657688,
  (e, t, i) => {
    t.exports = e.r(794909);
  },
  1948,
  (e, t, i) => {
    "use strict";
    (e.i(247167),
      Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "default", {
        enumerable: !0,
        get: function () {
          return l;
        },
      }));
    let n = e.r(670965),
      r = e.r(543369);
    function a({ config: e, src: t, width: i, quality: l }) {
      let o = (0, r.getDeploymentId)();
      if (t.startsWith("/") && !t.startsWith("//"))
        if (t.includes("/_next/static/immutable") && !(0, r.getAssetToken)())
          o = void 0;
        else {
          let e = t.indexOf("?");
          if (-1 !== e) {
            let i = new URLSearchParams(t.slice(e + 1)),
              n = i.get("dpl");
            if (n) {
              ((o = n), i.delete("dpl"));
              let r = i.toString();
              t = t.slice(0, e) + (r ? "?" + r : "");
            }
          }
        }
      if (
        t.startsWith("/") &&
        t.includes("?") &&
        e.localPatterns?.length === 1 &&
        "**" === e.localPatterns[0].pathname &&
        "" === e.localPatterns[0].search
      )
        throw Object.defineProperty(
          Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),
          "__NEXT_ERROR_CODE",
          { value: "E871", enumerable: !1, configurable: !0 },
        );
      let s = (0, n.findClosestQuality)(l, e);
      return `${e.path}?url=${encodeURIComponent(t)}&w=${i}&q=${s}${t.startsWith("/") && o ? `&dpl=${o}` : ""}`;
    }
    a.__next_img_default = !0;
    let l = a;
  },
  898879,
  (e, t, i) => {
    "use strict";
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "default", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(271645),
      r = "u" < typeof window,
      a = r ? () => {} : n.useLayoutEffect,
      l = r ? () => {} : n.useEffect;
    function o(e) {
      let { headManager: t, reduceComponentsToState: i } = e;
      function o() {
        if (t && t.mountedInstances) {
          let e = n.Children.toArray(
            Array.from(t.mountedInstances).filter(Boolean),
          );
          t.updateHead(i(e));
        }
      }
      return (
        r && (t?.mountedInstances?.add(e.children), o()),
        a(
          () => (
            t?.mountedInstances?.add(e.children),
            () => {
              t?.mountedInstances?.delete(e.children);
            }
          ),
        ),
        a(
          () => (
            t && (t._pendingUpdate = o),
            () => {
              t && (t._pendingUpdate = o);
            }
          ),
        ),
        l(
          () => (
            t &&
              t._pendingUpdate &&
              (t._pendingUpdate(), (t._pendingUpdate = null)),
            () => {
              t &&
                t._pendingUpdate &&
                (t._pendingUpdate(), (t._pendingUpdate = null));
            }
          ),
        ),
        null
      );
    }
  },
]);
