<template>
  <form class="form-add" @submit.prevent>
    <h3>Создай свой пост</h3>
    <my-input v-model="post.title" type="text" placeholder="Type name here" />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Type description here"
    />
    <my-button class="add-btn" @click="addPost" style="margin-top: 20px"
      >add post</my-button
    >
  </form>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    addPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: " ",
        body: " ",
      };
    },
  },
};
</script>

<style scoped>
.form-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
</style>
