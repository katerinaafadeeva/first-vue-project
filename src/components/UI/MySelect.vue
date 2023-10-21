<template>
  <select :value="modelValue" @change="changeOption" class="select">
    <option disabled value="">выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  // пропсы options пришли из родителя app / откуда и куда идет modelValue?
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(e) {
      // ??? еще раз разобраться с modelValue-> эмитим метод,чтобы он передавал инфу родителю app
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  background-color: rgba(3, 38, 26, 0.57);
  color: wheat;
  width: 200px;
  height: 50px;
  font-size: 17px;
}
</style>
