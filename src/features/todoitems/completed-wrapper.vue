<template>
  <div>
    <div
      class="d-flex align-items-center cursor-pointer"
      v-on:click.prevent="toggleExpansion()"
    >
      <div class="todo-circle px-3 py-1">
        <i class="far fa-check-square fa-fw"/>
      </div>

      <p class="todo-title flex-grow-1 mb-0">
        <span v-if="!isExpanded">Show&nbsp;</span>
        <span v-if="isExpanded">Hide&nbsp;</span>
        <span class="mr-2">completed to-do's</span>
        <span class="badge badge-secondary">{{todoItems.length}}</span>
      </p>

      <div class="p-3 mr-1">
        <i v-if="!isExpanded" class="fas fa-chevron-down fa-fw"/>
        <i v-if="isExpanded" class="fas fa-chevron-up fa-fw"/>
      </div>
    </div>

    <div v-if="isExpanded">
      <todo-item
        v-for="todoItem in todoItems"
        v-bind:key="todoItem.id"
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
    }
  }
};
</script>
