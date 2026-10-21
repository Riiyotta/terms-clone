import { Link } from 'react-router-dom'

// Routes this clone serves. Any other path still points at the live site.
export const LOCAL_ROUTES = ['/', '/about', '/pricing', '/changelog', '/docs', '/privacy', '/terms', '/sign-in', '/sign-up']

// `/path` → router <Link> if built locally, else https://terms.so/path. Everything else is a plain <a>.
export default function SmartLink({ href, children, ...rest }) {
  if (href.startsWith('/')) {
    const path = href.split('#')[0]
    if (LOCAL_ROUTES.includes(path)) return <Link to={href} {...rest}>{children}</Link>
    return <a href={`https://terms.so${href}`} {...rest}>{children}</a>
  }
  return <a href={href} {...rest}>{children}</a>
}
