// 请求带的参数有很多类型，比如字串、数组、json、特殊字符、Date...等等太多了 ，这里集中处理
// 用到Object.prototype.toString的地方很多，这里用toString将其缓存起来，不用每次都从Object这一层开始访问
const toString = Object.prototype.toString

// 如果不采用 val is Date，在调用的时候，编译器才能自动提示Date里面的方法，不然编译器识别不出来
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 仅仅判断是不是普通的json格式的对象
export function isPlainObject(val: any): val is Object {
  // 如果是 FormData，则返回[object FormData]
  return toString.call(val) === '[object Object]'
}