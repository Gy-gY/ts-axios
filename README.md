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