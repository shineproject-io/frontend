<template>
  <loading-container :is-loading="isLoading" class="p-2 mb-4">
    <div class="suggestions-wrapper" v-bind:class="{'no-events': isSubmitting}">
      <suggestion-item
        class="animated fadeInDown"
        v-for="suggestion in suggestions"
        v-bind:key="suggestion.suggestionTitle"
        :title="suggestion.suggestionTitle"
        :description="suggestion.suggestionDescription"
        :icon="suggestion.suggestionIcon"
        v-on:perform="createList(suggestion.listTitle, suggestion.listDescription, suggestion.listBackgroundImageUrl)"
      />
    </div>
  </loading-container>
</template>

<script>
import suggestionItem from "@/features/suggestions/suggestion-item.vue";
import listsService from "@/features/lists/lists.service.js";
import { mapState } from "vuex";

export default {
  components: {
    suggestionItem
  },
  data() {
    return {
      isSubmitting: false
    };
  },
  computed: {
    ...mapState("suggestionsModule", ["suggestions"]),
    isLoading() {
      return this.suggestions.length === 0;
    }
  },
  mounted() {
    this.$store.dispatch("suggestionsModule/getSuggestions");
  },
  methods: {
    createList(title, description, image) {
      this.isSubmitting = true;

      listsService.create(title, description, image).then(data => {
        this.$store.dispatch("listsModule/getLists");
        this.$router.push({
          path: "list",
          query: { listId: data }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.suggestions-wrapper{
  opacity: 0.9;
}
</style>