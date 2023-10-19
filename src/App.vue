<template>
  <div class="app">
    <div class="main">
      <h1 style="color: white; margin-left: 30px; padding-top: 30px">
        Страница с постами
      </h1>
      <my-input
        v-model="searchQuery"
        placeholder="Type to search..."
        style="margin-left: 20px"
      />
      <div class="app-btns">
        <my-button @click="showDialog">create post</my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>

      <my-dialog v-model:show="dialogVisible">
        <post-form @create="addPost"
      /></my-dialog>
      <post-list
        :posts="sortedAndSearched"
        @remove="removePost"
        v-if="!isPostsLoading"
      />
      <my-loader v-else class="lds-dual-ring"></my-loader>
      <my-pagination
        :total="totalPages"
        :page="page"
        @page-changed="changePage"
      ></my-pagination>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import _ from "lodash";
import MyButton from "./components/UI/MyButton.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
import MyPagination from "@/components/UI/MyPagination.vue";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MyLoader,
    MyPagination,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: "",
      isPostsLoading: false,
      selectedSort: "",
      page: 1,
      pagelimit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "по названию" },
        { value: "body", name: "по описанию" },
      ],
      searchQuery: "",
    };
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNum) {
      this.page = pageNum;
      // this.fetchPosts();
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _pageLimit: this.pageLimit,
              },
            }
          );
          this.totalPages = Math.ceil(
            res.headers["x-total-count"] / this.pagelimit // взяли поле из нетворка при запросе, округлили с ceil
          );
          this.posts = res.data;
          this.isPostsLoading = false;
        }, 2000);
      } catch (error) {
        alert("error occured");
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      const copiedPosts = _.cloneDeep(this.posts); // новая копия массива постов

      return copiedPosts.sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearched() {
      return this.sortedPost.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  background-color: rgb(38, 38, 38);
  height: 100%;
}
.app-btns {
  margin: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
