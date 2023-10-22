<template>
  <div class="singlePost-div">
    <h2 v-if="post" class="post-title">{{ post.title }}</h2>
    <p v-if="post" class="post-body">{{ post.body }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null, // Инициализируем переменную для хранения данных о посте
    };
  },
  async mounted() {
    try {
      // Получаем ID поста из маршрута
      const postId = this.$route.params.id;

      // Делаем запрос к серверу, передавая ID поста
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const postData = await response.json();
      this.post = postData;
    } catch (error) {
      console.error("Ошибка при загрузке данных о посте", error);
    }
  },
};
</script>
<style scoped>
.singlePost-div {
  background-color: black;
  height: 100vh;
  color: white;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.post-title {
  padding-bottom: 40px;
  font-size: 40px;
  padding: 50px;
}
.post-body {
  font-size: 25px;
  color: grey;
  padding: 50px;
}
</style>
