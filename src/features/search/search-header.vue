<template>
  <page-header>
    <div class="d-flex text-white">
      <h1 class="display-2 mb-3">Search</h1>
    </div>
    <div id="search-wrapper" class="align-content-center d-flex bg-glass animated pulse">
      <i class="fas fa-search fa-fw"/>
      <input id="search-field" ref="searchField" v-model="searchQuery">
    </div>
  </page-header>
</template>

<script>
const debounce = require("lodash/debounce");

export default {
  name: "list",
  data() {
    return {
      searchQuery: ""
    };
  },
  mounted() {
    this.$nextTick(() => this.$refs.searchField.focus());
  },
  methods: {
    search: debounce(function() {
      this.$emit("search", this.searchQuery);
    }, 500)
  },
  watch: {
    searchQuery() {
      this.search();
    }
  }
};
</script>

<style scoped>
#search-wrapper {
  max-width: 600px;
  width: 100%;
}

#search-wrapper i {
  padding: 20px;
  color: white;
}

input#search-field {
  /* border: 1px solid #F2F2F2 !important; */
  border: 0;
  background-color: transparent;
  outline: none;
  font-size: 20px;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
}
</style>