<template>
  <div v-if="currentList">
    <list-cover-picker ref="pictureSelector"/>
    <list-migrator ref="listMigrator"/>

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
import listCoverPicker from "@/features/lists/list-cover-picker.vue";
import listMigrator from "@/features/lists/list-migrator.vue";
import { mapState } from "vuex";

export default {
  name: "list-page",
  components: {
    listHeader,
    todoList,
    listCoverPicker,
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
    }
  }
};
</script>