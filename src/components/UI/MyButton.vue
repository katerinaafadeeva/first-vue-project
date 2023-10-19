<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  width: 170px;
  height: 60px;
  margin-bottom: 15px;
  background-color: rgb(230, 239, 239);
  border-radius: 17px;
  cursor: pointer;
}
</style>
