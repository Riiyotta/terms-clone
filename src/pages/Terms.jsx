import LegalDocument from '../components/LegalDocument.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { terms } from '../content/terms.js'

export default function Terms() {
  usePageTitle('Terms of Service — Terms')
  return <LegalDocument doc={terms} />
}
