import React from "react"

// 创建上下文
const NavigationContext = React.createContext()
const LocationContext = React.createContext()
// const RouteContext = React.createContext()

/**
 * 路由容器
 * @param {*} children 儿子
 * @param {*} navigator history
 * @param {*} location 地址对象 {pathname: '当前路径'}
 */
function Router({ children, navigator, location }) {
  return (
    <NavigationContext.Provider value={{ navigator }}>
      <LocationContext.Provider value={{ location }}>{children}</LocationContext.Provider>
    </NavigationContext.Provider>
  )
}

function useLocation() {
  return React.useContext(LocationContext).location
}

function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children))
}

function useRoutes(routes) {
  const location = useLocation()
  const pathname = location.pathname || "/"
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i]
    let match = matchPath(path, pathname)
    if (match) return element
  }
}

/**
 * 判断此 route 对应的 path 路径和地址中的 pathname 是否匹配
 * @param {*} path route 对应的路径
 * @param {*} pathname 当前路径名
 * @returns 是否匹配
 */
function matchPath(path, pathname) {
  const matcher = compilePath(path)
  return pathname.match(matcher)
}

/**
 * 把路径转化成正则表达式
 * @param {*} path 路径
 * @returns 正则
 */
function compilePath(path) {
  const regexpSource = "^" + path + "$"
  return new RegExp(regexpSource)
}

function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (child) => {
    const route = {
      path: child.props.path,
      element: child.props.element,
    }
    routes.push(route)
  })
  return routes
}

function Route(props) {}

export { Router, Routes, Route }
