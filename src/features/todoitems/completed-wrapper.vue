<template>
  <div class="completed-wrapper">
    <div
      class="completed-expander d-flex align-items-center cursor-pointer"
      v-on:click.prevent="toggleExpansion()"
    >
      <div class="active-circle px-3 py-1">
        <i class="far fa-check-square fa-fw"></i>
      </div>
      <p class="flex-grow-1 mb-0">
        <span v-if="!isExpanded">Show&nbsp;</span>
        <span v-if="isExpanded">Hide&nbsp;</span>
        <span class="mr-2">completed to-do's</span>
        <span class="badge badge-secondary">{{todoItems.length}}</span>
      </p>
      <i v-if="!isExpanded" class="fas fa-chevron-down fa-fw p-4 mr-2"/>
      <i v-if="isExpanded" class="fas fa-chevron-up fa-fw p-4 mr-2"/>
    </div>
    <div class="completed-inner" v-if="isExpanded">
      <todo-item
        v-for="todoItem in todoItems"
        v-bind:key="todoItem.id"
        v-on:todo-item-deleted="todoItemRemoved"
        v-on:todo-item-opened="todoItemOpened"
        :todo-item="todoItem"
        :listId="listId"
        class="animated fadeInDown animate-fast"
      />
    </div>
  </div>
</template>

<script>
import todoItem from "@/features/todoitems/todo-item.vue";

export default {
  components: {
    todoItem
  },
  props: {
    todoItems: {
      type: Array,
      required: true
    },
    listId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
    todoItemOpened: function(todoItemId) {
      this.$emit("todo-item-opened", todoItemId);
    },
    todoItemRemoved: function(todoItemId) {
      this.$emit("todo-item-removed", todoItemId);
    }
  }
};
</script>

<style>
.completed-expander p {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
</style>