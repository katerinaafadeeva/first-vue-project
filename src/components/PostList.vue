<template>
  <div v-if="posts.length > 0">
    <h3 style="color: wheat; font-size: 30px">Список поcтов</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        v-bind:key="post.id"
        class="list-item"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else class="no-posts-error">Нет постов для отображения</h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  background-color: rgb(38, 38, 38);
  margin-bottom: 0;
  padding-bottom: 50px;
  margin-left: 20px;
  margin-right: 20px;
}
.no-posts-error {
  color: red;
  margin-left: 30px;
}
.post-list {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
