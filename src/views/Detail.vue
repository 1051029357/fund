<template>
  <div class="detail">
    <van-nav-bar
      :title="fundInfo.name"
      left-arrow
      fixed
      @click-left="comeBack"
    />
    <van-pull-refresh v-model="loading" @refresh="getFundDetailInfo">
      <div class="content">
        <div class="info-box">
          <p class="fundname">{{ fundInfo.name }}</p>
          <div class="type-info">
            <span class="code">{{ fundInfo.code }}</span>
            <span class="type">{{ fundInfo.type }}</span>
          </div>
          <div class="data-box">
            <div class="last-year">
              <p
                class="value"
                :class="[
                  fundInfo.lastYearGrowth > 0
                    ? 'rise-color'
                    : fundInfo.lastYearGrowth < 0
                    ? 'fall-color'
                    : '',
                ]"
              >
                {{ lastYear }}
              </p>
              <p class="text">近一年涨跌幅</p>
            </div>
            <div class="day-growth">
              <p
                class="value"
                :class="[
                  fundInfo.dayGrowth > 0
                    ? 'rise-color'
                    : fundInfo.dayGrowth < 0
                    ? 'fall-color'
                    : '',
                ]"
              >
                {{ fundInfo.dayGrowth > 0 ? "+" : "" }}
                {{ fundInfo.dayGrowth }}%
              </p>
              <p class="text">日涨跌幅</p>
            </div>
            <div class="networth">
              <p class="value">{{ fundInfo.netWorth }}</p>
              <p class="text">净值{{ fundInfo.netWorthDate }}</p>
            </div>
          </div>
          <div class="bottom-info" v-if="!fundInfo.lastYearGrowth">
            <span>本基金为成立一年内的新发售基金</span>
          </div>
        </div>
        <div class="performance-trend">
          <p class="main-title">业绩走势</p>
          <div id="trend"></div>
        </div>
        <div class="history-networth-box">
          <p class="main-title">历史净值</p>
          <ul>
            <li class="title">
              <span>日期</span><span>单位净值</span><span>日涨幅</span>
            </li>
            <li v-for="(item, index) in netWorthData.slice(0, 5)" :key="index">
              <span class="date">{{ item[0] }}</span
              ><span class="netWorth">{{ item[1] }}</span
              ><span
                class="growth"
                :class="[
                  item[2] > 0 ? 'rise-color' : item[2] < 0 ? 'fall-color' : '',
                ]"
                >{{ item[2] > 0 ? "+" : "" }}{{ item[2] }}%</span
              >
            </li>
          </ul>
          <p class="show-more" @click="showMore">更多数据></p>
        </div>
        <div class="fund-record">
          <p class="main-title">基金档案</p>
          <ul>
            <li>
              <span>基金全称</span><span>{{ fundInfo.name }}</span>
            </li>
            <li>
              <span>基金代码</span><span>{{ fundInfo.code }}</span>
            </li>
            <li>
              <span>资产规模</span><span>{{ fundInfo.fundScale }}</span>
            </li>
            <li>
              <span>基金经理</span><span>{{ fundInfo.manager }}</span>
            </li>
            <li>
              <span>起购额度</span><span>{{ fundInfo.buyMin }}</span>
            </li>
            <li>
              <span>原始买入费率</span><span>{{ fundInfo.buySourceRate }}</span>
            </li>
            <li>
              <span>当前买入费率</span><span>{{ fundInfo.buyRate }}</span>
            </li>
          </ul>
          <p class="show-position" @click="toPosition">查看持仓></p>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { getFundDetail } from "@/request/api.js";
import { useRoute, useRouter } from "vue-router";
import * as echarts from "echarts";
export default {
  name: "detail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      fundInfo: {},
      netWorthData: [],
      //基金查询参数
      queryInfo: {
        code: route.params.code,
        startDate: "2020-10-22",
        endDate: "",
      },
      loading: false,
    });

    onMounted(() => {
      getFundDetailInfo();
    });
    //获取基金详细信息
    const getFundDetailInfo = () => {
      state.loading = true;
      getFundDetail(state.queryInfo).then((res) => {
        if (res.code == 200) {
          state.fundInfo = res.data;
          state.netWorthData = res.data.netWorthData;
          state.netWorthData.reverse();
          let arrX = [],
            arrY = [];
          state.fundInfo.totalNetWorthData.forEach((el) => {
            arrX.push(el[0]);
            arrY.push(el[1]);
          });
          drawChart(arrX, arrY);
          state.loading = false;
        }
      });
    };

    //绘制走势图
    const drawChart = (x, y) => {
      var myChart = echarts.init(document.getElementById("trend"));
      const option = {
        xAxis: {
          type: "category",
          data: x,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: y,
            type: "line",
            smooth: true,
          },
        ],
      };
      option && myChart.setOption(option);
    };

    //点击返回按钮
    const comeBack = () => {
      router.go(-1);
    };

    //查看更多历史净值数据
    const showMore = () => {
      localStorage.setItem("networthData", JSON.stringify(state.netWorthData));
      router.push({ path: "/networth" });
    };

    //前往查看持仓页面
    const toPosition = () => {
      router.push({ name: "Position", params: { code: route.params.code } });
    };

    const lastYear = computed(() => {
      if (state.fundInfo.lastYearGrowth) {
        if (state.fundInfo.lastYearGrowth > 0) {
          return "+" + state.fundInfo.lastYearGrowth + "%";
        } else {
          return state.fundInfo.lastYearGrowth + "%";
        }
      } else {
        return "--";
      }
    });
    return {
      ...toRefs(state),
      comeBack,
      getFundDetailInfo,
      lastYear,
      showMore,
      toPosition,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background-color: var(--main-color);
  .van-pull-refresh {
    min-height: 100vh;
  }
  .main-title {
    font-size: 18px;
  }
  .content {
    margin-top: 56px;
    .info-box {
      border-radius: 6px;
      padding: 10px;
      margin: 0 10px;
      background-color: #fff;
      .fundname {
        font-size: 18px;
        margin-bottom: 3px;
      }
      .type-info {
        .code {
          color: #888;
          margin-right: 5px;
          font-weight: bold;
        }
        .type {
          font-size: 12px;
        }
      }
      .data-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 15px;
        .text {
          color: var(--vice-color);
        }
        .last-year {
          .value {
            font-size: 26px;
          }
        }
        .day-growth {
        }
        .networth {
        }
      }
      .bottom-info {
        background-color: #eee;
        padding: 10px;
        border-radius: 4px;
        margin-top: 15px;
        span {
          color: var(--vice-color);
        }
      }
    }
    .performance-trend {
      border-radius: 6px;
      padding: 10px;
      background-color: #fff;
      margin: 10px 10px 0;
      #trend {
        height: 300px;
      }
    }
    .history-networth-box {
      border-radius: 6px;
      padding: 10px;
      background-color: #fff;
      margin: 10px 10px 0;
      ul {
        .title {
          color: var(--vice-color);
        }
        li {
          display: flex;
          padding: 5px 0;
          span {
            flex: 1;
            &:nth-child(2) {
              text-align: center;
            }
            &:nth-child(3) {
              text-align: right;
            }
          }
        }
      }
      .show-more {
        color: var(--main-color);
        text-align: center;
        margin-top: 15px;
      }
    }
    .fund-record {
      border-radius: 6px;
      padding: 10px;
      background-color: #fff;
      margin: 10px;
      ul {
        li {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
      }
      .show-position {
        color: var(--main-color);
        text-align: center;
        margin-top: 15px;
      }
    }
  }
}
</style>
