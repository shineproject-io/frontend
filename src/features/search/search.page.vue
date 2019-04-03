<template>
  <div>
    <search-header v-on:search="search"/>
    <loading-container class="lined-background" :is-loading="isSearching" message-suffix="search">
      <div v-for="result in searchResults" v-bind:key="result.resultId">
        <component v-bind:is="result.resultType.toLowerCase() + '-search-result'" :result="result"/>
      </div>
      <no-search v-if="!hasSearch"/>
      <no-results v-if="searchResults.length === 0 && hasSearch"/>
    </loading-container>
  </div>
</template>

<script>
import searchService from "@/features/search/search.service.js";
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
      isSearching: false
    };
  },
  methods: {
    search(searchQuery) {
      this.isSearching = true;
      if (searchQuery.length > 2) {
        searchService.search(searchQuery).then(data => {
          this.searchResults = data;
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
  height: 62px;
}
</style>