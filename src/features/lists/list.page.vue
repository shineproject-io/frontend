<template>
    <div v-if="list">
      <picture-selector
        :list-id="list.id"
        v-on:background-updated="updateBackground"
        v-on:list-background-updated="loadList()"
        ref="pictureSelector"
      ></picture-selector>
      <list-migrator :list-id="list.id" ref="listMigrator"/>
      <list-header
        v-bind="list"
        v-on:show-picture-selector="$refs.pictureSelector.show()"
        v-on:show-list-migrator="$refs.listMigrator.show()"
      ></list-header>
      <todo-list v-bind="list"/>
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
  data() {
    return {
      list: null
    };
  },
  computed: {
    ...mapState("todoModule", ["currentListId"])
  },
  watch: {
    "$route.query.listId"() {
      window.$(".complete-popover").popover("hide");
      this.list = null;
      this.$store.dispatch(
        "todoModule/setCurrentListId",
        this.$route.query.listId
      );
      this.loadList();
    }
  },
  created() {
    this.$store.dispatch(
      "todoModule/setCurrentListId",
      this.$route.query.listId
    );
    this.loadList();
  },
  methods: {
    loadList() {
      this.$http.get(`/lists/${this.currentListId}`).then(response => {
        this.list = response.data;
      });
    },
    updateBackground(imageSource) {
      this.list.imageSource = imageSource;
    }
  }
};
</script>