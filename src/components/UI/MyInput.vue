<template>
  <input type="text" :value="modelValue" @input="updateInput" class="input" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  width: 80%;
  border: 2px solid teal;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
}
</style>
