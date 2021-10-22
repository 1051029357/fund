<template>
  <div class="detail">
    <van-nav-bar
      :title="fundInfo.name"
      left-text="返回"
      left-arrow
      fixed
      @click-left="comeBack"
    />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="content">
        <div class="info-box">
          <p class="fundname">{{ fundInfo.name }}</p>
          <div class="type-info">
            <span class="code">{{ fundInfo.code }}</span>
            <span class="type">{{ fundInfo.type }}</span>
          </div>
          <div class="data-box">
            <div class="last-year">
              <p class="value">
                {{ fundInfo.lastYearGrowth ? fundInfo.lastYearGrowth : "--" }}
              </p>
              <p class="text">近一年涨跌幅</p>
            </div>
            <div class="day-growth">
              <p
                class="value"
                :class="{
                  'rise-color': fundInfo.dayGrowth > 0,
                  'fail-color': fundInfo.dayGrowth < 0,
                }"
              >
                <span v-show="fundInfo.dayGrowth > 0">+</span>
                <span v-show="fundInfo.dayGrowth < 0">-</span>
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
        <div class="performance-trend" id="trend"></div>
        <div class="history-networth-box"></div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
//import { getFundDetail } from "@/request/api.js";
import { useRoute, useRouter } from "vue-router";
import * as echarts from "echarts";
export default {
  name: "detail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      fundInfo: {
        code: "013596",
        name: "招商中证煤炭等权指数(LOF)C",
        type: "指数型",
        netWorth: 1.8171,
        expectWorth: 1.8165,
        totalWorth: 1.8171,
        expectGrowth: "6.20",
        dayGrowth: "6.24",
        lastWeekGrowth: "1.2368",
        lastMonthGrowth: "-2.59",
        lastThreeMonthsGrowth: "",
        lastSixMonthsGrowth: "",
        lastYearGrowth: "",
        buyMin: "10",
        buySourceRate: "0.00",
        buyRate: "0.00",
        manager: "侯昊",
        fundScale: "",
        netWorthDate: "2021-10-18",
        expectWorthDate: "2021-10-18 15:00:00",
        netWorthData: [
          ["2021-09-13", "1.9772", "0", ""],
          ["2021-09-14", "1.9435", "-1.7", ""],
          ["2021-09-15", "1.9707", "1.4", ""],
          ["2021-09-16", "1.9618", "-0.45", ""],
          ["2021-09-17", "1.8655", "-4.91", ""],
          ["2021-09-22", "1.9503", "4.55", ""],
          ["2021-09-23", "1.9166", "-1.73", ""],
          ["2021-09-24", "1.7875", "-6.74", ""],
          ["2021-09-27", "1.7259", "-3.45", ""],
          ["2021-09-28", "1.8006", "4.33", ""],
          ["2021-09-29", "1.718", "-4.59", ""],
          ["2021-09-30", "1.7876", "4.05", ""],
          ["2021-10-08", "1.7326", "-3.08", ""],
          ["2021-10-11", "1.7949", "3.6", ""],
          ["2021-10-12", "1.7655", "-1.64", ""],
          ["2021-10-13", "1.6656", "-5.66", ""],
          ["2021-10-14", "1.6546", "-0.66", ""],
          ["2021-10-15", "1.7104", "3.37", ""],
          ["2021-10-18", "1.8171", "6.24", ""],
        ],
        totalNetWorthData: [
          ["2021-09-13", "1.9772"],
          ["2021-09-14", "1.9435"],
          ["2021-09-15", "1.9707"],
          ["2021-09-16", "1.9618"],
          ["2021-09-17", "1.8655"],
          ["2021-09-22", "1.9503"],
          ["2021-09-23", "1.9166"],
          ["2021-09-24", "1.7875"],
          ["2021-09-27", "1.7259"],
          ["2021-09-28", "1.8006"],
          ["2021-09-29", "1.718"],
          ["2021-09-30", "1.7876"],
          ["2021-10-08", "1.7326"],
          ["2021-10-11", "1.7949"],
          ["2021-10-12", "1.7655"],
          ["2021-10-13", "1.6656"],
          ["2021-10-14", "1.6546"],
          ["2021-10-15", "1.7104"],
          ["2021-10-18", "1.8171"],
        ],
      },
      //基金查询参数
      queryInfo: {
        code: route.params.code,
        startDate: "",
        endDate: "",
      },
    });

    onMounted(() => {
      //getFundDetail(state.queryInfo).then((res) => {
      //  if (res.code == 200) {
      //    console.log(JSON.stringify(res.data));
      //    state.fundInfo = res.data;
      //  }
      //});

      let arr = [],
        arr1 = [];
      state.fundInfo.totalNetWorthData.forEach((el) => {
        arr1.push(el[0]);
        arr.push(el[1]);
      });
      var myChart = echarts.init(document.getElementById("trend"));
      const option = {
        xAxis: {
          type: "category",
          data: arr1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: arr,
            type: "line",
          },
        ],
      };
      option && myChart.setOption(option);
    });

    //点击返回按钮
    const comeBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      comeBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background-color: rgb(88, 120, 224);
  .van-pull-refresh {
    height: 100vh;
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
        .text {
          color: var(--vice-color);
        }
        .last-year {
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
      height: 300px;
    }
    .history-networth-box {
      border-radius: 6px;
      padding: 10px;
      background-color: #fff;
      margin: 10px 10px 0;
    }
  }
}
</style>
