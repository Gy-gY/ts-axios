// 我们通过执行XMLHTTPRequest对象实例的send方法发送请求，并通过该方法的参数设置请求body数据
// send方法的参数支持Document 和BodyInit类型
// BodyInit包括：Blob, BufferSource, FormData, URLSearchParams, ReadableStream, USVString
// 当没有数据时，我们还可以传入null
// 如果传入的data是个普通json，要转化成字符串JSON字符串
// 对于data，不仅是请求时对data做转换，服务端响应也要对data处理，所以都定义到这里
// 我们其实只需要对普通的对象做转换，其他类型如BodyInit原样即可
import { isPlainObject } from './utils';

export function transformRequest(data: any): any {
  // 其实直接用isObject方法是有问题的，因为看定义，BodyInit里面很多类型返回typeof也是 object，其实我们要判断的是普通对象
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}