import axios from "axios";
import { Notify } from "vant";

//接口文档地址 https://doctorxiong.club/api/
axios.defaults.baseURL = "https://api.doctorxiong.club/v1";
//axios.defaults.headers["token"] = "";  //token
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器
axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.code === 200) {
        return res.data;
      } else {
        Notify(res.data.message);
        return false;
      }
    }
  },
  (err) => Promise.reject(err)
);

export default axios;
