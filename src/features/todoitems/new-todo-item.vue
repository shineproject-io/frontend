<template>
  <div class="todo-item d-flex align-items-center text-muted">
    <div class="px-3 py-1">
      <i v-if="!isSubmitting" class="todo-circle far fa-circle fa-fw"/>
      <i v-if="isSubmitting" class="todo-circle fas fa-spinner fa-spin fa-fw"/>
    </div>

    <invisible-input
      v-if="!isSubmitting"
      class="flex-grow-1"
      v-on:updated="addTodoItem"
      placeholder="What do you want to do next?"
      class-list="todo-item-title"
      :clear-on-input="true"
      :is-focused="isFocused"
    />

    <p v-if="isSubmitting" class="flex-grow-1 todo-item-title mb-0">{{todoItemName}}</p>
  </div>
</template>

<script>
import todoService from '@/features/todoitems/todo.service.js';
import { mapState } from 'vuex';

export default {
  props: {
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      todoItemName: "",
      isSubmitting: false
    };
  },
  computed: {
    ...mapState("todoModule", ["currentListId"]),
  },
  methods: {
    addTodoItem(todoItemName) {
      this.todoItemName = todoItemName;
      this.isSubmitting = true;

      todoService.addTodo(this.currentListId, todoItemName).then(() => {
          this.$emit("todo-item-added");
          this.isSubmitting = false;
      })
    }
  }
};
</script>
