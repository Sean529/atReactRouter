import React from "react"
import { Router } from "../react-router"
import { createBrowserHistory, createHashHistory } from "history"
export * from "../react-router"

/**
 * 提供最干净的URL
 */
function BrowserRouter({ children }) {
  const historyRef = React.useRef(null)
  if (historyRef.current === null) {
    // 创建 browserHistory 对象
    historyRef.current = createBrowserHistory()
  }
  const history = historyRef.current
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })
  React.useLayoutEffect(() => history.listen(setState), [history])

  return <Router children={children} location={state.location} navigator={history} navigationType={state.action} />
}

function HashRouter({ children }) {
  const historyRef = React.useRef(null)
  if (historyRef.current === null) {
    // 创建 HashHistory 对象
    historyRef.current = createHashHistory()
  }
  const history = historyRef.current
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })
  React.useLayoutEffect(() => history.listen(setState), [history])

  return <Router children={children} location={state.location} navigator={history} navigationType={state.action} />
}

export { BrowserRouter, HashRouter }
