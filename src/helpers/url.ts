import { isDate, isPlainObject } from './utils'

// 为何不直接调用window.encodeURIComponent，因为这里对特殊字符做处理
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/$24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// buildURL没有采用 export default，是因为这个文件可能要导出多个函数，所以直接export即可
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || undefined) {
      // 这里的return是不会退出函数的，只是跳出本次循环，跳到下个循环
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 统一规范成一个数组，接下来统一处理
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // toISOString 本来是不会提示出来的，所以utils.ts中使用类型谓词
        val = val.toISOString
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`) // 光这么做不够，还要encode
    })
  })

  let serializedParams = parts.join('&')
  // 万一是个空字符串
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
