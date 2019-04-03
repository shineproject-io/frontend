<template>
  <page-header :background-image="currentList.imageSource">
    <div class="d-flex align-items-center">
      <h1 class="w-100">
        <invisible-input
          class="display-2 flex-grow-1 mb-2"
          :text="currentList.name"
          v-on:updated="saveName"
          class-list="text-white"
          placeholder="What is this list for..."
        />
      </h1>
      <div v-if="isListActive" class="align-self-center">
        <button
          type="button"
          class="list-dropdown btn btn-secondary btn-sm bg-transparent"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-h fa-fw"/>
        </button>
        <div
          class="dropdown-menu"
          x-placement="left-start"
          style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-196px, 0px, 0px);"
        >
          <div class="dropdown-header">Edit list</div>
          <a href="#" class="dropdown-item" v-on:click.prevent="$emit('show-picture-selector')">
            <i class="fas fa-image fa-fw mr-2"/>
            <span>Change picture</span>
          </a>
          <a
            v-if="openTodoItems && openTodoItems.length > 0 && otherLists.length > 0"
            href="#"
            class="dropdown-item"
            v-on:click.prevent="$emit('show-list-migrator')"
          >
            <i class="fas fa-plane fa-fw mr-2"/>
            <span>Move active to-dos</span>
          </a>
          <a href="#" class="dropdown-item" v-on:click.prevent="deleteList">
            <i class="fas fa-trash-alt fa-fw mr-2"/>
            <span>Delete list</span>
          </a>
        </div>
      </div>
    </div>
    <invisible-input
      class="d-block lead"
      :text="currentList.description"
      v-on:updated="saveDescription"
      class-list="text-white mb-2"
      placeholder="Describe why this list is important..."
    />

    <span v-if="isListCompleted" class="badge badge-success p-2">
      <i class="fas fa-check fa-fw mr-2"/>List completed
    </span>

    <completion-progress
      v-on:complete-list="changeListState('Completed')"
      :is-list-active="isListActive"
    />
  </page-header>
</template>

<script>
import completionProgress from "@/features/lists/completion-progress.vue";
import listService from "@/features/lists/lists.service.js";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    completionProgress
  },
  data() {
    return {
      progressValue: 0
    };
  },
  computed: {
    ...mapGetters("todoModule", ["openTodoItems"]),
    ...mapState("listsModule", ["lists", "currentList"]),
    ...mapGetters("listsModule", ["otherLists"]),
    isListActive() {
      return this.currentList.state === 1;
    },
    isListCompleted() {
      return this.currentList.state === 3;
    }
  },
  methods: {
    deleteList() {
      listService.delete(this.currentList.id).then(() => {
        this.$store.dispatch("listsModule/getLists");
        this.loadDefaultList();
      });
    },
    changeListState(state) {
      window.$(".complete-popover").popover("hide");

      listService.changeState(this.currentList.id, state).then(() => {
        this.$store.dispatch("listsModule/getLists");

        if (state === "Completed") {
          this.loadDefaultList();
        }
      });
    },
    saveName(newValue) {
      listService.changeName(this.currentList.id, newValue).then(() => {
        this.$store.dispatch("listsModule/getLists");
      });
    },
    saveDescription(newValue) {
      listService.saveDescription(this.currentList.id, newValue);
    },
    loadDefaultList() {
      this.$store
        .dispatch("listsModule/getDefaultList", this.$route.query.listId)
        .then(data => {
          this.$router.push({ path: "list", query: { listId: data.listId } });
        })
        .catch(() => {
          this.$router.push({ name: "profile" });
        });
    }
  }
};
</script>

<style>
.list-dropdown {
  border-color: #db5461 !important;
  color: #db5461 !important;
}

.list-dropdown:hover {
  border-color: #e5b25d !important;
  color: #e5b25d !important;
}

.list-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20px;
  opacity: 0.5;
  background-color: transparent;
  border-radius: 0 !important;
}

.list-progress .progress-bar {
  width: 0;
  transition: width 0.6s ease-in-out;
  background-color: #c0ea67 !important;
}
</style>