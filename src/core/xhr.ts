// 模块化出来的一个文件，实现请求方法
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 因为data、method是可选
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    // true: 异步，因为url在AxiosRequestConfig里面不是必传，万一是undefined，不符合string
    // 类型“string | undefined”的参数不能赋给类型“string”的参数。不能将类型“undefined”分配给类型“string”。
    // 所以 url 需要非空断言
    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // request.onerror = function handleError() {
    //   reject(new Error('NetWork Error'))
    // }
    request.onerror = function handleError() {
      // 不传response，因为error里面拿不到response
      reject(createError('NetWork Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONABORTRD', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }

  })
}