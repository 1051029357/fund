import axios from "./http";

//获取基金排行
export const getFundRank = (data) => {
  return axios({
    method: "post",
    url: "/fund/rank",
    data,
  });
};
