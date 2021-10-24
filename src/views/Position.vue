<template>
  <div class="position">
    <van-nav-bar
      title="持仓信息"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <van-pull-refresh v-model="isLoading" @refresh="isLoading = false">
      <div class="main-content">
        <div class="distribution">
          <div class="main-title">
            <span>投资分布</span><span>{{ positionInfo.date }}</span>
          </div>
          <div class="draw-box" id="draw-box"></div>
        </div>
        <div class="stockbox">
          <div class="main-title">
            <span>重仓持股</span><span>{{ positionInfo.date }}</span>
          </div>
          <ul class="stock-list">
            <li>
              <div>股票名称</div>
              <div>占比</div>
              <div>持有股数(万股)</div>
            </li>
            <li v-for="(item, index) in positionInfo.stockList" :key="index">
              <div class="name">
                <span>{{ item[1] }}</span
                ><span>{{ item[0] }}</span>
              </div>
              <div>{{ item[2] }}</div>
              <div>{{ item[3] }}</div>
            </li>
          </ul>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { reactive, toRefs, onMounted } from "vue";
import { getFundPosition } from "@/request/api.js";
import { useRoute } from "vue-router";
export default {
  name: "Position",
  setup() {
    const state = reactive({
      positionInfo: {},
      isLoading: false,
    });
    const route = useRoute();
    onMounted(() => {
      getFundPosition(route.params.code).then((res) => {
        if (res.code == 200) {
          state.positionInfo = res.data;

          let other;
          if (
            parseFloat(res.data.stock) +
              parseFloat(res.data.bond) +
              parseFloat(res.data.cash) >
            100
          ) {
            other = 0;
          } else {
            other =
              1 -
              parseFloat(res.data.stock) -
              parseFloat(res.data.bond) -
              parseFloat(res.data.cash);
          }

          const data = [
            { name: "股票", value: parseFloat(res.data.stock) },
            { name: "债券", value: parseFloat(res.data.bond) },
            { name: "现金", value: parseFloat(res.data.cash) },
            {
              name: "其它",
              value: other,
            },
          ];
          console.log(data);
          const chartDom = document.getElementById("draw-box");
          const myChart = echarts.init(chartDom);

          const option = {
            title: {
              text: state.positionInfo.title,
              textStyle: {
                fontWeight: 400,
                width: 375,
                overflow: "breakAll",
              },
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              left: "left",
              top: "middle",
            },
            series: [
              {
                type: "pie",
                radius: ["60%", "30%"],
                data,
                labelLine: false,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };

          option && myChart.setOption(option);
        }
      });
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.position {
  .van-nav-bar {
    border-bottom: 1px solid #eee;
  }
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    span:first-child {
      font-size: 16px;
    }
    span:last-child {
      font-size: 12px;
      color: var(--vice-color);
    }
  }
  .main-content {
    margin-top: 46px;
    background-color: #eee;
    .distribution {
      background-color: #fff;
      margin-bottom: 10px;
      padding: 0 10px;
      #draw-box {
        height: 300px;
      }
    }
    .stockbox {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 0 10px;
      .stock-list {
        li {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          font-size: 12px;
          &:first-child {
            border-top: 1px solid #eee;
            color: var(--vice-color);
            span {
              font-size: 12px;
            }
          }
          .name {
            display: flex;
            flex-direction: column;
            span:last-child {
              font-size: 12px;
              color: var(--vice-color);
              margin-top: 3px;
            }
          }
          div {
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
    }
  }
}
</style>
