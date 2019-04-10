<template>
  <div class="completed-wrapper">
    <div class="d-flex align-items-center cursor-pointer completed-inner" v-on:click.prevent="toggleExpansion()">
      <div class="todo-circle px-3 py-1">
        <i class="far fa-check-square fa-fw"/>
      </div>

      <p class="todo-title flex-grow-1 mb-0">
        <span v-if="!isExpanded">Show&nbsp;</span>
        <span v-else>Hide&nbsp;</span>

        <span class="mr-2">completed to-do's</span>
        <span class="badge badge-secondary">{{completedTodoItems.length}}</span>
      </p>

      <div class="p-3 mr-1">
        <i v-if="!isExpanded" class="fas fa-chevron-down fa-fw"/>
        <i v-else class="fas fa-chevron-up fa-fw"/>
      </div>
    </div>

    <div v-if="isExpanded">
      <todo-item
        v-for="todoItem in completedTodoItems"
        v-bind:key="todoItem.id"
        :todo-item="todoItem"
        class="animated fadeInDown animate-fast"
      />
    </div>
  </div>
</template>

<script>
import todoItem from "@/features/todoitems/todo-item.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    todoItem
  },
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    ...mapGetters("todoModule", ["completedTodoItems"])
  },
  methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style lang="scss">
.completed-wrapper {
  background-color: $primary-background-colour;
}

.completed-inner {
  border-bottom: 1px solid $primary-border-colour;
}
</style>