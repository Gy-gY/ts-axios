// 模块化出来的一个文件，实现请求方法
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  // 因为data、method是可选
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  // true: 异步
  request.open(method.toUpperCase(), url, true) // true 表示是否异步

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })


  request.send(data)
}