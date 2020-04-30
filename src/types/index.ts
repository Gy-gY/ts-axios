// 项目中所有公共类型定义文件
export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  // 这里吧url修改为可选，是因为后面interface Axios url专门作为一个参数，所以这里不太必要
  // 因为get、post、delete...都自带了url参数
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number // 请求超时
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 混合对象axios本身是个函数，我们再实现一个包括它属性方法的类，然后把这个类的原型属性和自身属性拷贝到 axios 上
export interface Axios {
  request(confg: AxiosRequestConfig): AxiosPromise
  get(url: string, confg?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 本来AxiosInstance是一个(config: AxiosRequestConfig): AxiosPromise 函数
// 但现在让它继承 Axios，就既有了本身的函数类型，又拥有了 Axios 上所有的属性方法，是一个混合结构
// AxiosInstance 这个接口本身就是这样一个函数(config: AxiosRequestConfig): AxiosPromise，然后再继承Axios
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}