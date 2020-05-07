import { AxiosInstance } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/utils';

function createInstance(): AxiosInstance {
  const context = new Axios()
  // instance 指向 Axios.prototype.request，光指定不行，因为里面有this，所以要把context 绑定进去
  const instance = Axios.prototype.request.bind(context)
  // 上面定义好一个函数，接下来把Axios类上的原型属性和实例属性全拷贝到instance上
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios