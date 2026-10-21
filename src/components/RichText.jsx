import SmartLink from './SmartLink.jsx'

// Minimal inline markup for src/content/* strings:
//   [label](href)   link (external hrefs open in a new tab)
//   `code`          inline <code>
//   **bold**        <strong>
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g

export default function RichText({ text, linkClassName }) {
  const out = []
  let last = 0
  let m
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const key = m.index
    if (m[1]) {
      const external = /^https?:/.test(m[2])
      out.push(
        <SmartLink key={key} href={m[2]} className={linkClassName} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {m[1]}
        </SmartLink>,
      )
    } else if (m[3]) {
      out.push(<code key={key}>{m[3]}</code>)
    } else {
      out.push(<strong key={key}>{m[4]}</strong>)
    }
    last = TOKEN.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
