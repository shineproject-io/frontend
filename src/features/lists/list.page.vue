<template>
  <div>
    <div v-if="currentList">
      <list-cover-picker ref="pictureSelector"/>
      <list-migrator ref="listMigrator"/>

      <list-header
        v-on:show-picture-selector="$refs.pictureSelector.show()"
        v-on:show-list-migrator="$refs.listMigrator.show()"
      />
      <todo-list/>
    </div>
    <not-found v-if="isNotFound"/>
  </div>
</template>

<script>
import listHeader from "@/features/lists/list-header.vue";
import todoList from "@/features/todoitems/todo-list.vue";
import listCoverPicker from "@/features/lists/list-cover-picker.vue";
import listMigrator from "@/features/lists/list-migrator.vue";
import notFound from "@/features/lists/not-found.vue";
import { mapState } from "vuex";

export default {
  name: "list-page",
  components: {
    listHeader,
    todoList,
    listCoverPicker,
    listMigrator,
    notFound
  },
  data() {
    return {
      isNotFound: false
    };
  },
  computed: {
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
      this.isNotFound = false;

      this.$store
        .dispatch("listsModule/getList", this.$route.query.listId)
        .catch(() => {
          this.isNotFound = true;
        });
    }
  }
};
</script>