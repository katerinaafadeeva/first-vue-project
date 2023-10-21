<template>
  <div class="nav">
    <div @click="$router.push('/')" style="cursor: pointer">
      Vue First project
    </div>
    <div class="navbar-btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/')">О приложении</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  components: { MyButton },
};
</script>

<style scoped>
.nav {
  height: 70px;
  background-color: teal;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.navbar-btns {
  margin-left: auto;
}
</style>
