import xhr from './xhr'
import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types/index';
import { transformRequest } from './helpers/data';


function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
// 上面函数是对config.url做了处理，下面对config.data做处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}


export default axios
