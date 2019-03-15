<template>
  <loading-container class="lined-background" :isLoading="isLoading && todoItems.length === 0">
    <completed-wrapper v-if="completedItems.length > 0" :todo-items="completedItems" :list-id="id"/>

    <draggable
      v-model="todoItems"
      :pull="false"
      handle=".todo-drag"
      @start="drag=true"
      @end="drag=false"
    >
      <todo-item
        v-for="todoItem in todoItems"
        v-bind:key="todoItem.id"
        :todo-item="todoItem"
        :listId="id"
      />
    </draggable>

    <new-todo-item
      v-if="isListActive"
      v-on:todo-item-added="newTodoItemAdded"
      :list-id="id"
      :is-focused="focusNewTodoItemField"
    />
  </loading-container>
</template>

<script>
import completedWrapper from "@/features/todoitems/completed-wrapper";
import todoItem from "@/features/todoitems/todo-item.vue";
import newTodoItem from "@/features/todoitems/new-todo-item.vue";
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  components: {
    completedWrapper,
    todoItem,
    newTodoItem,
    draggable
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      focusNewTodoItemField: false,
    };
  },
  computed: {
    ...mapState("todoModule", ["completedItems", "currentListId"]),
    todoItems: {
      get() {
        return this.$store.state.todoModule.todoItems;
      },
      set(value) {
        var dispatchModel = {
          listId: this.id,
          todoItems: value
        };

        this.$store.dispatch("todoModule/setTodoItemsOrder", dispatchModel);
      }
    },
    isListActive() {
      return this.state === 1;
    }
  },
  watch: {
    currentListId() {
      this.loadTodoItems();
    }
  },
  mounted() {
    this.loadTodoItems();
  },
  methods: {
    loadTodoItems() {
      this.isLoading = true;

      this.$store.dispatch("todoModule/getTodoItems").then(() => {
        if (this.todoItems.length === 0 && this.completedItems.length === 0) {
          this.focusNewTodoItemField = true;
        }
        this.isLoading = false;
      });
    },
    newTodoItemAdded() {
      this.focusNewTodoItemField = true;
      this.loadTodoItems();
    }
  }
};
</script>
