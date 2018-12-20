<template>
  <div class="todo-item d-flex align-items-center cursor-pointer text-muted">
    <div class="new-todo-item-circle px-3 py-1">
      <i v-if="!isSubmitting" class="far fa-circle fa-fw"></i>
      <i v-if="isSubmitting" class="fas fa-spinner fa-spin fa-fw"></i>
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
export default {
  props: {
    listId: {
      type: Number,
      required: true
    },
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      todoItemName: "",
      isSubmitting: false
    };
  },
  methods: {
    addTodoItem: function(todoItemName) {
      this.todoItemName = todoItemName;
      this.isSubmitting = true;

      this.$http
        .post(`/lists/${this.listId}/todoItems`, {
          title: todoItemName
        })
        .then(() => {
          this.$emit("todo-item-added");
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style scoped>
.todo-item {
  height: 62px;
  cursor: default;
}

.todo-item-title {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}

.new-todo-item-circle {
  font-size: 20px;
  color: #cecece;
}
</style>