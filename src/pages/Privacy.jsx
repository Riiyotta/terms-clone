import LegalDocument from '../components/LegalDocument.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { privacy } from '../content/privacy.js'

export default function Privacy() {
  usePageTitle('Privacy Policy — Terms')
  return <LegalDocument doc={privacy} />
}
