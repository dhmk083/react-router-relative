import React from 'react'
import {
  Route as _Route,
  Switch as _Switch,
  Redirect as _Redirect,
  Link as _Link,
  NavLink as _NavLink,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

export * from 'react-router-dom'

function joinUrl(base, tail) {
  if (tail[0] === '/') return tail

  const joiner = base[base.length - 1] === '/' ? '' : '/'
  return base + joiner + tail
}

function useExpanded(kind, path) {
  const parentRoute = useRouteMatch()
  return parentRoute && typeof path === 'string'
    ? joinUrl(parentRoute[kind], path)
    : path
}

export const Route = props => {
  const path = useExpanded('path', props.path)
  return <_Route {...props} path={path} />
}

export const Link = props => {
  const to = useExpanded('url', props.to)
  return <_Link {...props} to={to} />
}

export const NavLink = props => {
  const to = useExpanded('url', props.to)
  return <_NavLink {...props} to={to} />
}

export const Redirect = props => {
  const location = useLocation()

  if (typeof props.from === 'function' && !props.from(location.pathname)) {
    return null
  }

  const to =
    typeof props.to === 'function' ? props.to(location.pathname) : props.to

  return <_Redirect {...props} to={to} />
}

export const Switch = ({ children, ...props }) => {
  const parentRoute = useRouteMatch()
  const base = parentRoute && parentRoute.path

  return (
    <_Switch {...props}>
      {React.Children.map(children, x => {
        const ps = {}

        for (const k of ['from', 'path']) {
          const p = x.props[k]

          if (p !== undefined) {
            ps[k] = base ? joinUrl(base, p) : p
          }
        }

        return React.cloneElement(x, ps)
      })}
    </_Switch>
  )
}
