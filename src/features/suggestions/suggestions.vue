<template>
  <loading-container :is-loading="isLoading" class="p-2 mb-4">
    <div v-bind:class="{'no-events': isSubmitting}">
      <list-suggestion
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      isSubmitting: false
    }
  },
  computed: {
    ...mapState("suggestionsModule", ["suggestions"]),
    isLoading() {
      return this.suggestions.length === 0;
    }
  },
  mounted() {
    this.$store.dispatch("suggestionsModule/getSuggestions")
  },
  methods: {
    createList(title, description, image) {
      this.isSubmitting = true;

      this.$http
        .post(`/lists`, {
          name: title,
          description: description,
          imageSource: image
        })
        .then(response => {
          this.$store.dispatch("listsModule/getLists");
          this.$router.push({
            path: "list",
            query: { listId: response.data }
          });
        });
    }
  }
};
</script>