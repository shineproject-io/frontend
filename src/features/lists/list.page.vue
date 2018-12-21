<template>
  <div v-if="list">
    <picture-selector
      :list-id="list.id"
      v-on:background-updated="updateBackground"
      v-on:list-background-updated="loadList()"
      ref="pictureSelector"
    ></picture-selector>
    <list-migrator :list-id="list.id" ref="listMigrator"/>
    <transition name="fade">
      <list-header
        v-bind="list"
        v-on:show-picture-selector="$refs.pictureSelector.show()"
        v-on:show-list-migrator="$refs.listMigrator.show()"
      ></list-header>
    </transition>
    <transition name="fade">
      <list-content v-bind="list"></list-content>
    </transition>
  </div>
</template>

<script>
import listHeader from "@/features/lists/list-header.vue";
import listContent from "@/features/lists/list-content.vue";
import pictureSelector from "@/features/lists/picture-selector.vue";
import listMigrator from "@/features/lists/list-migrator.vue";

export default {
  name: "list-page",
  components: {
    listHeader,
    listContent,
    pictureSelector,
    listMigrator
  },
  watch: {
    "$route.query.listId"() {
      window.$(".complete-popover").popover("hide");
      this.list = null;
      this.listId = this.$route.query.listId;
      this.loadList();
    }
  },
  data() {
    return {
      isLoading: true,
      listId: 0,
      list: null
    };
  },
  created() {
    this.listId = this.$route.query.listId;

    this.loadList();
  },
  methods: {
    loadList() {
      this.isLoading = true;
      this.$http.get(`/lists/${this.listId}`).then(response => {
        this.list = response.data;
        this.isLoading = false;
      });
    },
    updateBackground(imageSource) {
      this.list.imageSource = imageSource;
    }
  }
};
</script>