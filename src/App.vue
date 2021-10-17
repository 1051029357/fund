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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.rise-color {
  color: red;
}
.fall-color {
  color: green;
}
</style>
