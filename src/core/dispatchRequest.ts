// 在原文件src/axios.ts的请求流程转移到之类，因为这也是一个很核心的流程
// 入口文件
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers'

// 原src/axios.ts axios函数
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 注意调用顺序
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // url这里会报错，因为我们把AxiosRequestConfig中url设为可选了，就有undefined的可能，但undefined不是string类型
  // 怎么解决？我们断言它不为空，后面加个! 非空断言操作符
  // return buildURL(url, params)
  return buildURL(url!, params)
}
// 上面函数是对config.url做了处理，下面对config.data做处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}


function transformHeaders(config: AxiosRequestConfig): any {
  // headers给个默认值{},不为空即可，不然processHeaders处理会出问题
  // 解构赋值默认值的写法
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
