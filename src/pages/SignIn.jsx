import AuthMock from '../components/AuthMock.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function SignIn() {
  usePageTitle('Terms')
  return <AuthMock mode="sign-in" />
}
