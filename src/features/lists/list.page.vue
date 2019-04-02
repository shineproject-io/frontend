<template>
  <div v-if="currentList">
    <picture-selector
      :list-id="currentList.id"
      v-on:background-updated="updateBackground"
      v-on:list-background-updated="loadList()"
      ref="pictureSelector"
    />
    <list-migrator :list-id="currentList.id" ref="listMigrator"/>
    <list-header
      v-on:show-picture-selector="$refs.pictureSelector.show()"
      v-on:show-list-migrator="$refs.listMigrator.show()"
    />
    <todo-list/>
  </div>
</template>

<script>
import listHeader from "@/features/lists/list-header.vue";
import todoList from "@/features/todoitems/todo-list.vue";
import pictureSelector from "@/features/lists/picture-selector.vue";
import listMigrator from "@/features/lists/list-migrator.vue";
import { mapState } from "vuex";

export default {
  name: "list-page",
  components: {
    listHeader,
    todoList,
    pictureSelector,
    listMigrator
  },
  computed: {
    ...mapState("todoModule", ["currentListId"]),
    ...mapState("listsModule", ["currentList"])
  },
  watch: {
    "$route.query.listId"() {
      window.$(".complete-popover").popover("hide");

      this.initialise();
    }
  },
  created() {
    this.initialise();
  },
  methods: {
    initialise() {
      this.$store.dispatch(
        "todoModule/setCurrentListId",
        this.$route.query.listId
      );

      this.$store.dispatch("listsModule/getList", this.currentListId);
    },
    updateBackground(imageSource) {
      this.$store.dispatch("listsModule/setBackground", imageSource);
    }
  }
};
</script>