<template>
  <loading-container class="todo-list" :isLoading="isLoading && todoItems.length === 0">
    <completed-wrapper
      v-if="completedTodoItems.length > 0"
      v-on:todo-item-removed="todoRemoved"
      v-on:todo-item-opened="todoOpened"
      :todo-items="completedTodoItems"
      :list-id="id"
    />

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
        v-on:todo-item-deleted="todoRemoved"
        v-on:todo-item-completed="todoCompleted"
        v-on:todo-item-opened="todoOpened"
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
    },
    state: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      completedTodoItems: [],
      todoItems: [],
      skipLoad: true,
      focusNewTodoItemField: false
    };
  },
  watch: {
    todoItems() {
      if (!this.skipLoad && this.todoItems.length > 0) {
        this.$http.post(`/lists/${this.id}/todoItems/order`, {
          todoItemIds: this._.map(this.todoItems, "id")
        });
      }
      if (this.skipLoad) {
        this.skipLoad = false;
      }
    }
  },
  mounted() {
    this.loadTodoItems();

    this.$root.$on("refresh-todo-list", () => {
      this.todoItems = [];
      this.loadTodoItems();
    });
  },
  beforeDestroy() {
    this.$root.$off("refresh-todo-list");
  },
  computed: {
    isListActive() {
      return this.state === 1;
    }
  },
  methods: {
    newTodoItemAdded() {
      this.focusNewTodoItemField = true;
      this.loadTodoItems();
    },
    loadTodoItems() {
      this.skipLoad = true;
      this.isLoading = true;

      this.$http.get(`/lists/${this.id}/todoItems`).then(response => {
        let openTodoItems = this._.filter(response.data, function(tdo) {
          return tdo.state === "Open";
        });

        this.todoItems = this._.orderBy(
          openTodoItems,
          ["position", "dateCreated"],
          ["asc", "asc"]
        );

        this.completedTodoItems = this._.filter(response.data, function(tdo) {
          return tdo.state === "Completed";
        });

        if (
          this.todoItems.length === 0 &&
          this.completedTodoItems.length === 0
        ) {
          this.focusNewTodoItemField = true;
        }

        this.communicateProgress();
        this.isLoading = false;
      });
    },
    todoRemoved() {
      this.loadTodoItems();
    },
    todoCompleted() {
      this.loadTodoItems();
    },
    todoOpened() {
      this.loadTodoItems();
    },
    communicateProgress() {
      var completedCount = this.completedTodoItems.length;
      var openCount = this.todoItems.length;
      var totalCount = completedCount + openCount;

      this.$root.$emit(
        "list-count-refresh",
        (completedCount / totalCount) * 100
      );
    }
  }
};
</script>

<style>
.todo-list {
  background-image: url("https://shinestorage.azureedge.net/productimages/lined-background.png");
  min-height: calc(100vh - 316px);
}
</style>