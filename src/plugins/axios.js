import axios from "axios";
import { Modal, message } from 'antd';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let baseURL = process.env.NODE_ENV === 'production' ? 'fwmp/api' : 'apis/fwmp/api'
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const http = axios.create(config);
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function(response) {
    // 请求成功，只返回获取的数据
    if(response && response.status === 200){
      // 登录超时，提示进行重新登录
      // 请求成功，但返回的数据中状态码为-1，重新登录
      if(response.data && response.data.code === -1){
        Modal.confirm({
          title: '登录超时',
          content: '请点击确定前往登录页进行重新登录',
          onOk: function(){
            // 前往登录页的逻辑
          }
        })
      }
      return response.data;
    }
    return response    
  },
  function(error) {
    // Do something with response error
    if (error && error.response) {
      var map = {
        'default': '请求错误',
        400: '请求错误',
        401: '未授权，请进行授权',
        403: '拒绝访问',
        404: `请求地址出错: ${error.response.config.url}`,
        408: '请求超时',
        500: '服务器内部错误',
        501: '服务未实现',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
        505: 'HTTP版本不受支持',
      }
      var txt = map[error.response.status] || map['default']
      message.error(txt)
    }
    return Promise.reject(error);
  }
);

export default http
