<template>
  <div class=""></div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "",
  setup() {
    const store = useStore();
    console.log(store);
    const state = reactive({});
    onMounted(()=>{
      
    })
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
