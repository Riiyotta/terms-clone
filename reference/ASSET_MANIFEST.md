Source: https://terms.so/

# Asset manifest (home page)

| Asset | Live URL | Format / size | Local copy | In public/? |
|---|---|---|---|---|
| ABC Diatype Regular (400) | https://terms.so/_next/static/immutable/media/ABCDiatype_Regular-s.p.2l9hyxaqc41u6.otf | OTF | public/fonts/ABCDiatype-Regular.otf | yes |
| ABC Diatype Medium (500) | https://terms.so/_next/static/immutable/media/ABCDiatype_Medium-s.p.0dot6379laeuo.otf | OTF | public/fonts/ABCDiatype-Medium.otf | yes |
| Geist Mono 400, latin subset | https://terms.so/_next/static/immutable/media/64c5f24155ea0bd5.p.32f10yu79vtgx.woff2 | woff2, 9872 B | public/fonts/GeistMono.woff2 (byte-identical) | yes |
| Geist Mono 400, box-drawing subset (U+2000-2001,U+2004-2008,U+200A,U+23B8-23BD,U+2500-259F; has the caret ▌) | https://terms.so/_next/static/immutable/media/122b9f2e4f8e51a4.25fzyfulsmhsq.woff2 | woff2, 3344 B | reference/assets/122b9f2e4f8e51a4.25fzyfulsmhsq.woff2 | **no: copy to public/fonts/** |
| "Watch a demo" play icon | https://terms.so/landing/play.svg | SVG 18x18 | public/assets/play.svg, reference/svgs/landing-play-chip.svg | yes |
| Demo mouse cursor | https://terms.so/cursors/macos-arrow@2x.png | PNG 56x80 RGBA, shown at 28x40 | reference/assets/macos-arrow@2x.png | **no: copy to public/cursors/** |
| favicon | https://terms.so/favicon.ico | ICO 32x32 | public/favicon.ico | yes |
| icon | https://terms.so/icon.svg | SVG | public/icon.svg | yes |
| apple-touch-icon | https://terms.so/apple-icon.png | PNG 180x180 | public/apple-icon.png | yes |

Inline SVGs (all `viewBox="0 0 24 24"`, 16px unless noted, `fill`/`stroke` = currentColor), saved in reference/svgs/:
| File | Used for |
|---|---|
| logo-mark.svg | Nav and footer logo (viewBox 0 0 381 512, 20.09x27) |
| icon-pause.svg | Demo playback button (playing) |
| icon-play-resume.svg | Demo playback button (paused). Taken from the JS bundle; not in the DOM at rest |
| icon-attach.svg | "Attach a file" buttons |
| icon-send-arrow.svg | "Enter" send buttons (stroked chevron, stroke-width 1.5) |
| icon-arrow-up.svg | "Comment" button |
| icon-check.svg | Ready/Saved/Changes saved/change note/Resolve/Resolved/clause marker (resolved) |
| icon-agreement.svg | "Your draft" toolbar (16px), citation card heading (20px) |
| icon-comment-bubble.svg | Clause marker (16px), comments empty state (24px) |

No video, no raster content images, no canvas, no Lottie on the home page.
