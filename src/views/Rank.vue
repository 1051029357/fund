<template>
  <div class="rank">
    <van-tabs v-model:active="active" sticky @click-tab="changeType">
      <van-tab title="全部" name=""> </van-tab>
      <van-tab title="股票型" name="gp"> </van-tab>
      <van-tab title="混合型" name="hh"> </van-tab>
      <van-tab title="债券型" name="zq"> </van-tab>
      <van-tab title="指数型" name="zs"> </van-tab>
      <van-tab title="qdii" name="qdii"> </van-tab>
      <van-tab title="FOF" name="fof"> </van-tab>
    </van-tabs>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <ul class="list-content">
        <li
          class="fund-item"
          v-for="item in fundList"
          :key="item.code"
          @click="gotoDetail(item.code)"
        >
          <div class="top-info">
            <span class="name">{{ item.name }}</span>
            <span class="code">{{ item.code }}</span>
          </div>
          <div class="main-info">
            <div class="item latest">
              <span>{{ item.netWorth }}</span> <span>最新净值</span>
            </div>
            <div class="item daily">
              <span
                :class="{
                  'rise-color': parseFloat(item.dayGrowth) > 0,
                  'fall-color': parseFloat(item.dayGrowth) < 0,
                }"
                >{{ item.dayGrowth }}%</span
              >
              <span>日涨跌幅</span>
            </div>
            <div class="item last-year">
              <span
                v-if="item.lastYearGrowth"
                :class="{
                  'rise-color': parseFloat(item.lastYearGrowth) > 0,
                  'fall-color': parseFloat(item.lastYearGrowth) < 0,
                }"
                >{{ item.lastYearGrowth }}%</span
              >
              <span v-else>--</span>
              <span>近一年</span>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs, onMounted } from "vue";
import Tabbar from "@/components/Tabbar";
import { getFundRank } from "@/request/api.js";
import { useRouter } from "vue-router";
export default {
  name: "rank",
  components: {
    Tabbar,
  },
  setup() {
    const store = useStore();
    console.log(store);
    const router = useRouter();
    const state = reactive({
      fundList: [], //基金列表
      loading: false,
      finished: false,
      fundQueryInfo: {
        fundType: [""],
        sort: "r",
        fundCompany: [],
        creatTimeLimit: 0,
        fundScale: 0,
        asc: 0,
        pageIndex: 1,
        pageSize: 20,
      }, //基金查询参数
      active: 0, //当前标签页
    });

    onMounted(() => {});

    const getData = () => {
      getFundRank(state.fundQueryInfo).then((res) => {
        if (res.code == 200) {
          if (res.data.pageIndex >= res.data.allPages) {
            state.finished = true;
            return false;
          }
          state.fundList.push(...res.data.rank);
          state.loading = false;
        }
      });
      state.fundQueryInfo.pageIndex++;
    };

    const changeType = ({ name }) => {
      state.fundQueryInfo.fundType[0] = name;
      state.fundList = [];
      getData();
    };

    //点击基金前往详情页
    const gotoDetail = (code) => {
      router.push({ name: "Detail", params: { code } });
    };

    return {
      ...toRefs(state),
      getData,
      changeType,
      gotoDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.rank {
  .van-list {
    margin-bottom: 50px;
  }
  .list-content {
    background-color: #eee;
    .fund-item {
      padding: 10px 20px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .top-info {
      margin-bottom: 10px;
      .name {
        font-size: 16px;
        margin-right: 10px;
      }
      .code {
        font-size: 12px;
        color: #888;
      }
    }
    .main-info {
      display: flex;
      justify-content: space-between;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        &.latest {
          align-items: flex-start;
          width: 65px;
        }
        &.last-year {
          align-items: flex-end;
          width: 65px;
        }
        span:first-child {
          font-size: 18px;
        }
        span:last-child {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}
</style>
