<template>
  <div>
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
      <div ref="observer" class="observer"></div>
      <!-- <my-pagination
        :total="totalPages"
        :page="page"
        @page-changed="changePage"
      ></my-pagination> -->
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import _ from "lodash";
import MyButton from "@/components/UI/MyButton.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
// import MyPagination from "@/components/UI/MyPagination.vue";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MyLoader,
    // MyPagination,
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
      // передаем этот сорт в качестве пропса на ребенка -MySelect
      sortOptions: [
        { value: "title", name: "по названию" },
        { value: "body", name: "по описанию" },
      ],
      searchQuery: "",
    };
  },

  // все методы регистрируются здесь и передаюися пропсами при необходимости
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
    // changePage(pageNum) {
    //   this.page = pageNum;
    //   // this.fetchPosts();
    // },
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
        }, 1000);
      } catch (error) {
        alert("error occured");
      }
    },

    // асинхронка для получения постов в бесконечном скролле:
    async loadMorePosts() {
      try {
        this.page = this.page + 1;
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
          this.posts = [...this.posts, ...res.data];
        }, 1000);
      } catch (error) {
        alert("error occured");
      }
    },
  },

  // mount===useEffect():
  mounted() {
    this.fetchPosts();
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    //  воспользуемся стрелочной ф-ей чтобы получить доступ к фукнции loadMorePosts :
    const callback = (entries, obsrver) => {
      if (entries[0].isIntersecting) {
        this.loadMorePosts();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer); // передаем реф на отслеживаемый дом элемент
  },

  // computed===useMemo():
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
.main {
  background-color: rgb(38, 38, 38);
  height: 100%;
}
.app-btns {
  margin: 15px;
  display: flex;
  justify-content: space-between;
}
.observer {
  height: 30px;
  background: grey;
}
</style>
