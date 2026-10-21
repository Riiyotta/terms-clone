import { useState } from 'react'

// CLONE_SPEC_PAGES 1 "Photo stack". Slot vars are fixed per index; only z-order / --depth / data-front change.
const PHOTOS = [
  { src: '/about/studio-review.jpg', dx: -0.9, dy: 0.15, rot: '-8deg', w: 0.92, aspect: '3 / 4', alt: 'The team gathered around a screen reviewing work' },
  { src: '/about/studio-table.jpg', dx: 0.05, dy: -0.1, rot: '2deg', w: 1, aspect: '4 / 5', alt: 'Red chairs around a black round table with books and microphones' },
  { src: '/about/studio-desk.jpg', dx: 0.95, dy: 0.2, rot: '7deg', w: 1.08, aspect: '5 / 4', alt: 'A desk with an iMac in front of a wall of bookshelves' },
]

export default function PhotoStack() {
  const [order, setOrder] = useState([0, 1, 2])
  const front = order[order.length - 1]

  const onCardClick = (i) => {
    setOrder((prev) => {
      const last = prev[prev.length - 1]
      // Front card goes to the back; any other card comes to the front.
      if (i === last) return [last, ...prev.slice(0, -1)]
      return [...prev.filter((x) => x !== i), i]
    })
  }

  return (
    <div className="photo-stack" role="group" aria-label="Photos of the studio">
      {PHOTOS.map((p, i) => {
        const depth = order.indexOf(i)
        const isFront = i === front
        return (
          <button
            key={p.src}
            type="button"
            className="photo-stack-card"
            data-front={isFront ? '' : undefined}
            aria-label={isFront ? 'Show the next photo' : 'Bring this photo to the front'}
            onClick={() => onCardClick(i)}
            style={{
              zIndex: depth + 1,
              '--depth': depth,
              '--dx': p.dx,
              '--dy': p.dy,
              '--rot': p.rot,
              '--w': p.w,
              '--aspect': p.aspect,
            }}
          >
            <img src={p.src} alt={p.alt} draggable={false} decoding="async" />
          </button>
        )
      })}
    </div>
  )
}
