<template>
  <div class="page-wrapper" style="color: white">
    <div
      v-for="pageNum in total"
      :key="pageNum"
      class="page"
      :class="{ 'current-page': pageNum === page }"
      @click="changePage(pageNum)"
    >
      {{ pageNum }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageNum) {
      this.$emit("page-changed", pageNum);
    },
  },
};
</script>
<style scoped>
.page-wrapper {
  display: flex;
  margin-top: 15px;
  justify-content: center;
  align-self: center;
  align-items: center;
  background-color: rgb(88, 172, 172);
  padding-bottom: 30px;
}
.page {
  border: 2px solid black;
  padding: 10px;
  width: 60px;
  margin: 5px;
  cursor: pointer;
}
.current-page {
  border: 3px solid red;
}
</style>
