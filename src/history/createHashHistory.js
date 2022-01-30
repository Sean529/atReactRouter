function createHashHistory() {
  let historyStack = [] // 历史栈
  let historyIndex = -1 // 栈顶
  let action = "POP" // 动作类型
  let state // 路径中的状态
  let listeners = [] // 存放所有的监听函数

  function go(n) {
    action = "POP"
    historyIndex += n
    const nextLocation = historyStack[historyIndex]
    state = nextLocation.state
    window.location.hash = nextLocation.pathname
  }

  function goBack() {}

  function goForward() {}

  /**
   * 添加/跳转路径
   * @param {string} pathname 路径名，可能是字符串，也可能是{pathname,state}
   * @param {*} nextState
   */
  function push(pathname, nextState) {
    action = "PUSH"
    if (typeof pathname === "object") {
      state = pathname.state
      pathname = pathname.pathname
    } else {
      state = nextState
    }
    // 修改 hash 之后会触发 hashchange
    window.location.hash = pathname
  }

  function hashchangeHandler() {
    const pathname = window.location.hash.slice(1) // 把#号去掉
    Object.assign(history, { action, location: { pathname, state } })
    if (action === "PUSH") {
      historyStack[++historyIndex] = history.location
    }
    listeners.forEach((listener) => listener({ location: history.location, action: history.action }))
  }

  window.addEventListener("hashchange", hashchangeHandler)

  function listen(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((item) => item !== listener)
    }
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
  if (window.location.hash) {
    action = 'PUSH'
    hashchangeHandler()
  } else {
    window.location.hash = '/'
  }
  return history
}

export default createHashHistory
