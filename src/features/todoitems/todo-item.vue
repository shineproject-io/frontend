<template>
  <div class="todo-item d-flex align-items-center">
    <div class="px-3 py-1">
      <i v-if="isSubmitting" class="todo-circle fas fa-spinner fa-spin fa-fw"/>

      <i
        v-if="showActiveCircle"
        class="todo-circle far fa-circle fa-fw"
        v-on:click.prevent="completeTodoItem"
      />

      <i
        v-if="showCompletedCircle"
        class="todo-circle completed-circle fas fa-check-circle fa-fw"
        v-on:click.prevent="openTodoItem"
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
      v-if="todoItem.state !== 'Completed' && allowDrag"
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

export default {
  props: {
    listId: {
      type: Number,
      required: true
    },
    todoItem: {
      type: Object,
      required: true
    },
    allowDrag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      modifiedTodoItem: null,
      isSubmitting: false
    };
  },
  computed: {
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

      this.$http
        .delete(`/lists/${this.listId}/todoItems/${this.todoItem.id}`)
        .then(() => {
          this.$store.dispatch("todoModule/getTodoItems");
          this.isSubmitting = false;
        });
    },
    saveTitle(newValue) {
      this.isSubmitting = true;

      var changeTodoTitleModel = {
        listId: this.listId,
        todoItemId: this.todoItem.id,
        title: newValue
      };

      this.$store
        .dispatch("todoModule/changeTodoTitle", changeTodoTitleModel)
        .then(() => {
          this.isSubmitting = false;
        });
    },
    completeTodoItem() {
      this.isSubmitting = true;

      todoService.changeState(this.listId, this.todoItem.id, "Completed").then(() => {
        this.isSubmitting = false;
        this.$store.dispatch("todoModule/getTodoItems");
      });
    },
    openTodoItem() {
      this.isSubmitting = true;

      todoService.changeState(this.listId, this.todoItem.id, "Open").then(() => {
        this.isSubmitting = false;
        this.$store.dispatch("todoModule/getTodoItems");
      });
    }
  }
};
</script>

<style>
.todo-item {
  height: 62px;
}

.todo-drag {
  cursor: move;
}

.todo-circle {
  font-size: 20px;
  cursor: pointer;
}

.completed-circle {
  color: #c0ea67;
}

.todo-circle:hover {
  color: #c0ea67;
}

.todo-button-primary {
  color: #db5461;
  padding: 10px;
}

.todo-button-primary:hover {
  color: #e5b25d;
}

.todo-button-secondary {
  color: #dbdbdb;
  padding: 10px;
}

.todo-button-secondary:hover {
  color: #e5b25d;
}

.todo-title {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
</style>