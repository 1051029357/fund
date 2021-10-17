<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "layout",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      selectedKeys: ["/home"],
      theme: computed(() => store.state.theme),
    });

    const handleClick = (e) => {
      router.push({ path: e.key });
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  div {
    flex: 1;
  }
}
.ant-menu {
  width: 256px;
  height: 100vh;
}
</style>
