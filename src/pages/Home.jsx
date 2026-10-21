import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import DraftPreview from '../components/DraftPreview.jsx'
import QuestionsPreview from '../components/QuestionsPreview.jsx'
import CommentsPreview from '../components/CommentsPreview.jsx'
import Footer from '../components/Footer.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function Home() {
  usePageTitle('Terms.so: Never touch DocuSign again.')
  return (
    <div className="landing landing--wide landing--home">
      <Navbar />
      <Hero />
      <div className="landing-col grid gap-24 pb-8 lt760:gap-16">
        <DraftPreview />
        <QuestionsPreview />
        <CommentsPreview />
      </div>
      <Footer showChangelog />
    </div>
  )
}
