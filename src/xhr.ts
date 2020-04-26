// 模块化出来的一个文件，实现请求方法
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  // 因为data、method是可选
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()
  // true: 异步
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}