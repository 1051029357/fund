<template>
  <div class="networth">
    <van-nav-bar
      title="历史净值"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <van-pull-refresh v-model="isLoading" @refresh="isLoading = false">
      <ul>
        <li class="title">
          <span>日期</span><span>单位净值</span><span>日涨幅</span>
        </li>
        <li v-for="(item, index) in networthData" :key="index">
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
    </van-pull-refresh>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, ref } from "vue";
export default {
  name: "networth",
  setup() {
    const state = reactive({});
    const networthData = ref([]);
    const isLoading = ref(false);
    onMounted(() => {
      networthData.value = JSON.parse(localStorage.getItem("networthData"));
    });
    return {
      ...toRefs(state),
      networthData,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.networth {
  ul {
    padding: 0 10px;
    margin-top: 46px;
    .title {
      color: var(--vice-color);
      padding: 5px 0;
    }
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
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
}
</style>
