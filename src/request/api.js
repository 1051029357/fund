import axios from "./http";

//获取基金排行
export const getFundRank = (data) => {
  return axios({
    method: "post",
    url: "/fund/rank",
    data,
  });
};

//获取基金基础信息
export const getBaseInfo = (code) => {
  return axios({
    method: "get",
    url: "/fund?code=" + code,
  });
};

//获取基金详情
export const getFundDetail = (data) => {
  return axios({
    method: "get",
    url: "/fund/detail",
    params: data,
  });
};

//获取基金持仓详情
export const getFundPosition = (code) => {
  return axios({
    method: "get",
    url: "/fund/position?code=" + code,
  });
};
