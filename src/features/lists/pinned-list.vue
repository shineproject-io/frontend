<template>
  <div>
    <router-link
      :to="'/secure/list?listId=' + list.id"
      :title="list.name"
      class="list-highlight list-group-item list-group-item-action rounded cursor-pointer d-flex align-items-center margin-auto p-4"
    >
      <div class>
        <i class="fas fa-list-alt fa-fw" style="font-size: 35px;margin-right: 10px;"/>
      </div>
      <div class="flex-grow-1 border-left px-4">
        <h5>{{list.name}}</h5>
        <p class="mb-0">{{list.description}}</p>
      </div>
      <small class="badge badge-secondary p-2 mr-2">{{todoItems.length}} to-dos</small>
      <i class="d-none d-lg-block fas fa-chevron-right fa-fw" style="font-size: 20px;"/>
    </router-link>

    <todo-item
      class="pinned-todo-item list-group-item list-group-item-action rounded p-0"
      v-for="todoItem in openTodoItems"
      v-bind:key="todoItem.id"
      :todo-item="todoItem"
      :listId="list.id"
      :allow-drag="false"
      v-on:todo-item-deleted="$emit('refresh-todo-items')"
      v-on:todo-item-completed="$emit('refresh-todo-items')"
      v-on:todo-item-opened="$emit('refresh-todo-items')"
    />
  </div>
</template>

<script>
import todoItem from "@/features/todoitems/todo-item.vue";
export default {
  components: {
    todoItem
  },
  props: {
    list: {
      type: Object,
      required: true
    },
    todoItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    openTodoItems: function() {
      return this._.filter(this.todoItems, function(tdo) {
        return tdo.state === "Open";
      });
    }
  }
};
</script>

<style>
.pinned-todo-item {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>