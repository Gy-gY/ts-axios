# ts-axios
使用TypeScript实现axios

## 处理请求body数据
我们通过执行XMLHTTPRequest对象实例的send方法发送请求，并通过该方法的参数设置请求body数据
send方法的参数支持Document 和BodyInit类型
BodyInit包括：Blob, BufferSource, FormData, URLSearchParams, ReadableStream, USVString
当没有数据时，我们还可以传入null
如果传入的data是个普通json，要转化成字符串JSON字符串