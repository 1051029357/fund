<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
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
