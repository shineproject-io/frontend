<template>
  <div class="todo-item d-flex align-items-center">
    <div class="px-3 py-1">
      <i v-if="isSubmitting" class="todo-circle fas fa-spinner fa-spin fa-fw"/>

      <i
        v-if="showActiveCircle"
        class="todo-circle far fa-circle fa-fw"
        v-on:click.prevent="changeTodoState('Completed')"
      />

      <i
        v-if="showCompletedCircle"
        class="todo-circle completed-circle fas fa-check-circle fa-fw"
        v-on:click.prevent="changeTodoState('Open')"
      />
    </div>

    <invisible-input
      class="flex-grow-1 border-0"
      :text="todoItem.title"
      v-on:updated="saveTitle"
      placeholder="What do you want to do?"
      class-list="todo-title"
    />

    <i
      v-if="todoItem.state !== 'Completed'"
      class="todo-button-secondary todo-drag fas fa-arrows-alt"
    />
    <div class="btn-group dropleft mr-2">
      <button
        type="button"
        class="todo-button-primary btn btn-link bg-transparent"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-ellipsis-h fa-fw"/>
      </button>
      <div class="dropdown-menu" x-placement="left-start">
        <div class="dropdown-header">Edit to-do</div>
        <a href="#" class="dropdown-item" v-on:click.prevent="deleteTodoItem">
          <i class="fas fa-trash fa-fw mr-1"/>
          <span>Delete</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import todoService from "@/features/todoitems/todo.service.js";
import { mapState } from "vuex";

export default {
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modifiedTodoItem: null,
      isSubmitting: false
    };
  },
  computed: {
    ...mapState("todoModule", ["currentListId"]),
    showActiveCircle() {
      return !this.isSubmitting && this.todoItem.state === "Open";
    },
    showCompletedCircle() {
      return !this.isSubmitting && this.todoItem.state === "Completed";
    }
  },
  mounted() {
    this.modifiedTodoItem = this.todoItem;
  },
  methods: {
    deleteTodoItem() {
      this.isSubmitting = true;

      todoService
        .deleteTodo(this.currentListId, this.todoItem.id)
        .then(() => {
          this.isSubmitting = false;
          this.$store.dispatch("todoModule/getTodoItems");
        });
    },
    saveTitle(newValue) {
      this.isSubmitting = true;

      var changeTodoTitleModel = {
        listId: this.currentListId,
        todoItemId: this.todoItem.id,
        title: newValue
      };

      this.$store
        .dispatch("todoModule/changeTodoTitle", changeTodoTitleModel)
        .then(() => {
          this.isSubmitting = false;
        });
    },
    changeTodoState(newState) {
      this.isSubmitting = true;

      todoService
        .changeState(this.currentListId, this.todoItem.id, newState)
        .then(() => {
          this.isSubmitting = false;
          this.$store.dispatch("todoModule/getTodoItems");
        });
    }
  }
};
</script>

<style lang="scss">
.todo-item {
  min-height: 62px;
  background-color: $primary-background-colour;
  border-bottom: 1px solid $primary-border-colour;
}

.todo-drag {
  cursor: move;
}

.todo-circle {
  font-size: 20px;
  cursor: pointer;
}

.completed-circle {
  color: $brand-success-colour;
}

.todo-circle:hover {
  color: $brand-success-colour;
}

.todo-button-primary {
  color: $brand-primary-colour;
  padding: 10px;
}

.todo-button-primary:hover {
  color: $brand-secondary-colour;
}

.todo-button-secondary {
  color: #dbdbdb;
  padding: 10px;
}

.todo-button-secondary:hover {
  color: $brand-secondary-colour;
}

.todo-title {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>