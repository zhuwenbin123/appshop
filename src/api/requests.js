// 对axios进行封装
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
let requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});


// 请求拦截器
requests.interceptors.request.use((config) => {
  //现在的问题是config是什么?配置对象
  //可以让进度条开始动
  nprogress.start();
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    console.log("服务器响应数据失败", err);
  }
);

export default requests;