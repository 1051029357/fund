<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="label-o" to="/rank">排行</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs } from "vue";
export default {
  name: "tabbar",
  setup() {
    const store = useStore();
    console.log(store);
    const state = reactive({
      active: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
