<template>
  <div class="post">
    <div class="post-div">
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>

    <div class="delete-div">
      <my-button type="button" class="del-btn" @click="$emit('remove', post)"
        >delete</my-button
      >
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  margin: 7px;
  font-size: 20px;
}
.post {
  border: 3px solid rgb(2, 66, 66);
  padding: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(252, 252, 66, 0.904);
  border-radius: 9px;
}
.post:hover {
  cursor: pointer;
  box-shadow: 0 2px 30px 1px rgba(252, 252, 66, 0.904);
  /* transition: 2s ease; */
}

.delete-div {
  display: flex;
  align-items: center;
}
</style>
