<template>
  <Layout></Layout>
</template>

<script>
import { onMounted } from "vue";
import Layout from "@/components/Layout";
export default {
  components: {
    Layout,
  },
  setup() {
    onMounted(() => {});

    return {};
  },
};
</script>

<style lang="scss">
:root {
  --vice-color: #969799;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
}
.rise-color {
  color: red;
}
.fall-color {
  color: green;
}
</style>
