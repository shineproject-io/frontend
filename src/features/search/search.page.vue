<template>
  <div v-if="isLoaded">
    <search-header v-on:search="search"></search-header>
    <section class="content bd-highlight">
      <loading-container :is-loading="isSearching" message-suffix="search">
        <div v-for="result in searchResults" v-bind:key="result.resultId">
          <component
            v-bind:is="result.resultType.toLowerCase() + '-search-result'"
            :result="result"
          ></component>
        </div>
        <no-search v-if="!hasSearch"></no-search>
        <no-results v-if="searchResults.length === 0 && hasSearch"></no-results>
      </loading-container>
    </section>
  </div>
</template>

<script>
import searchHeader from "@/features/search/search-header.vue";
import listSearchResult from "@/features/search/list-search-result.vue";
import todoSearchResult from "@/features/search/todo-search-result.vue";
import noSearch from "@/features/search/no-search.vue";
import noResults from "@/features/search/no-results.vue";

export default {
  components: {
    searchHeader,
    listSearchResult,
    todoSearchResult,
    noSearch,
    noResults
  },
  data() {
    return {
      searchResults: [],
      hasSearch: false,
      isLoaded: false,
      isSearching: false
    };
  },
  mounted() {
    this.isLoaded = true;
  },
  methods: {
    search: function(searchQuery) {
      this.isSearching = true;
      if (searchQuery.length > 2) {
        this.$http.get(`/search?searchQuery=${searchQuery}`).then(response => {
          this.searchResults = response.data;
          this.hasSearch = true;
          this.isSearching = false;
        });
      } else {
        this.searchResults = [];
        this.hasSearch = false;
        this.isSearching = false;
      }
    }
  }
};
</script>

<style>
.search-result {
  padding-top: 11px;
  padding-bottom: 11px;
}
</style>