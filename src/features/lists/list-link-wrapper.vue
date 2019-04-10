<template>
  <loading-container id="list-link-wrapper" :is-loading="isLoading" message-suffix="lists">
    <draggable
      v-model="lists"
      :pull="false"
      @start="drag=true"
      @end="drag=false"
      handle=".list-handle"
    >
      <list-link
        v-for="list in lists"
        v-bind:class="{ 'list-handle' : allowDraggable}"
        v-bind:key="list.id"
        v-bind="list"
      />
    </draggable>

    <div v-if="lists && lists.length == 0" class="text-center px-4 py-5 text-muted">
      <i class="fas fa-chalkboard fa-fw mb-3" style="font-size: 20px;"/>
      <p class="mb-1">You don't have any active lists!</p>
    </div>
  </loading-container>
</template>

<script>
import listLink from "@/features/lists/list-link.vue";
import draggable from "vuedraggable";

export default {
  components: {
    listLink,
    draggable
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    lists: {
      get() {
        return this.$store.state.listsModule.lists;
      },
      set(value) {
        this.$store.dispatch("listsModule/updateListOrder", value);
      }
    },
    allowDraggable() {
      if (screen.width < 768) {
        return false;
      }

      return true;
    }
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("listsModule/getLists").then(() => {
      this.isLoading = false;
    });
  }
};
</script>

<style lang="scss">
#list-link-wrapper {
  max-height: calc(100vh - 302px);
  overflow: auto;

  @media (max-height: $media-phone-landscape) {
    max-height: unset;
  }
}

.list-link:nth-child(even) {
  background: $primary-background-highlight-colour;
}

.list-link:hover {
  background-color: $brand-secondary-colour;
  color: $inverted-text-colour;
}
</style>