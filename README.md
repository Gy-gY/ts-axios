# ts-axios
使用TypeScript实现axios

## 处理请求body数据
我们通过执行XMLHTTPRequest对象实例的send方法发送请求，并通过该方法的参数设置请求body数据
send方法的参数支持Document 和BodyInit类型
BodyInit包括：Blob, BufferSource, FormData, URLSearchParams, ReadableStream, USVString
当没有数据时，我们还可以传入null
如果传入的data是个普通json，要转化成字符串JSON字符串

## 处理请求Header
我们做了请求数据的处理，把data转换成了JSON字符串，但是数据到达服务端的时候，服务端并不能正常解析
我们发送的数据，因为我们没有给请求 headr 设置正则的 Content-Type
所以，我们发送请求的时候，可以支持配置 headers 属性，如下：
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf8'
  },
  data: {
    a: 1,
    b: 2
  }
})
并且，在当我们传入的data为普通对象的时候， headers 如果没有配置 Content-Type属性，需要自动设置请求 header 的
Content-Type 字段为： application/json;charset=utf-8

## 获取响应数据
我们发出请求，从网络接收服务端返回的数据，但代码层面没有做任何关于返回数据的处理，我们希望支持Promise
axios({}).then(res => { console.log(res) })
我们可以拿到res对象，我们希望该对象包括：服务端返回的数据data，http状态码status，状态消息statusText，响应头headers，
请求配置对象config以及请求的XMLHTTPRequest对象实例 request 。

# 处理响应data
如果没设置 responseType 的时候，默认为空，返回的是字符串，当服务端返回给我们的数据是字符串类型，我们可以尝试把他转换为JSON对象
方便以后使用

# 错误处理
axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log(res)
}).catch(e => {
  // 主要在这里处理异常
  console.log(e)
})

## 更详细的错误信息
我们希望对外提供的信息不仅仅包括错误文本信息，还包括请求对象配置 config，错误代码 code， XMLHTTPRequest 对象实例
request 以及自定义响应对象 response

## 扩展接口
为了使用户更加方便的使用 axios 发送请求，我们可以为所有支持请求方法扩展一些接口：
1: axios.request(config)
2: axios.get(url[, config])
3: axios.delete(url[, config])
4: axios.head(url[, config])
5: axios.options(url[, config])
6: axios.post(url[, data[, config]]) url必填，data、config选填
7: axios.put(url[, data[, config]])
8: axios.pat(url[, data[, config]])
如果你用了这些方法，就不必在config中指定url、method、data这些属性了
从需求上看，axios不再是单单一个方法，更像一个混合对象，本身是一个方法，又有很多方法属性，
接下来我们来实现这个混合对象

## 接口类型定义
混合对象axios 本身就是一个函数，我们可基于类的方式去实现它的方法属性，然后把这个类原型属性和自身属性再拷贝到 axios 上。
混合对象axios本身是个函数，我们再实现一个包括它属性方法的类，然后把这个类的原型属性和自身属性拷贝到 axios 上

## 混合对象实现
混合对象实现思路简单，首先这个对象是个函数，其次这个对象要包括Axios类的所有的原型属性和实例类型。我们首先来实现一个辅助
函数  extend
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
