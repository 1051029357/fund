<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-button type="danger">危险按钮</van-button>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  name: "Home",
  components: {
    Tabbar,
  },
};
</script>
<style lang="scss" scoped></style>
