function createBrowserHistory() {
  const globalHistory = window.history
  let state
  let listeners = [] // 存放所有的监听函数

  function go(n) {
    globalHistory.go(n)
  }

  function goBack() {
    globalHistory.goBack()
  }

  function goForward() {
    globalHistory.goForward()
  }

  /**
   * 添加/跳转路径
   * @param {string} pathname 路径名，可能是字符串，也可能是{pathname,state}
   * @param {*} nextState
   */
  function push(pathname, nextState) {
    const action = "PUSH"
    if (typeof pathname === "object") {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }
    globalHistory.pushState(state, null, pathname)
    const location = { pathname, state }
    notify({ location, action })
  }

  function listen(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((item) => item !== listener)
    }
  }

  window.onpopstate = () => {
    const location = { pathname: window.location.pathname, state: globalHistory.state }
    notify({ location, action: "POP" })
  }

  function notify(newState) {
    // 把 newState 上得属性都拷贝到 history 上
    Object.assign(history, newState) // newState {location, action}
    history.length = globalHistory.length
    listeners.forEach((listener) => listener({ location: history.location, action: history.action }))
  }

  const history = {
    action: "POP",
    go,
    goBack,
    goForward,
    push,
    listen,
    location: { pathname: window.location.pathname, state: window.location.state },
  }
  return history
}

export default createBrowserHistory
