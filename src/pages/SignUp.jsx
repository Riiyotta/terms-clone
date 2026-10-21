import AuthMock from '../components/AuthMock.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function SignUp() {
  usePageTitle('Terms')
  return <AuthMock mode="sign-up" />
}
