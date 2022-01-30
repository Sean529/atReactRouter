const path = "/post/:id/:age"
const pathname = "/post/100/200"

function compilePath(path) {
  const paramNames = []
  let regexpSource =
    "^" +
    path.replace(/:(\w+)/g, (_, key) => {
      paramNames.push(key)
      return "([^\\/]+)"
    })
  regexpSource += "$"
  const matcher = new RegExp(regexpSource)
  return [matcher, paramNames]
}

const [matcher, paramNames] = compilePath(path)
// paramNames ['id', 'age']
const match = pathname.match(matcher)
const values = match.slice(1) // [100,200]

const params = paramNames.reduce((memo, paramName, index) => {
  memo[paramName] = values[index]
  return memo
}, {})

console.log('%c AT-[ params ]-21', 'font-size:13px; background:#de4307; color:#f6d04d;', params);
