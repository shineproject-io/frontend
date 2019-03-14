<template>
  <div id="list-link-wrapper">
    <loading-container :is-loading="isLoadingLists" message-suffix="lists">
      <draggable v-model="localLists" :pull="false" @start="drag=true" @end="drag=false">
        <list-link v-for="list in localLists" v-bind:key="list.id" v-bind="list"/>
      </draggable>
      <div v-if="localLists.length == 0" class="text-center px-4 py-5 text-muted">
        <i class="fas fa-chalkboard fa-fw mb-3" style="font-size: 20px;"/>
        <p class="mb-1">You don't have any active lists!</p>
      </div>
    </loading-container>
  </div>
</template>

<script>
import listLink from "@/features/lists/list-link.vue";
import draggable from "vuedraggable";

export default {
  components: {
    listLink,
    draggable
  },
  data() {
    return {
      localLists: [],
      isLoadingLists: true,
      skipLoad: true
    };
  },
  computed: {
    storedLists() {
      return this.$store.getters.getLists;
    }
  },
  mounted() {
    this.loadLists();

    this.$root.$on("refresh-lists", () => {
      this.loadLists();
    });

    this.$root.$on("load-default-list", () => {
      this.loadDefaultList();
    });
  },
  beforeDestroy() {
    this.$root.$off("refresh-lists");
    this.$root.$off("load-default-list");
  },
  watch: {
    storedLists() {
      this.localLists = this.storedLists;
    },
    localLists() {
      if (!this.skipLoad && this.localLists.length > 0) {
        this.$store.dispatch("updateListOrder", this.localLists);
      } else {
        this.skipLoad = false;
      }
    }
  },
  methods: {
    loadLists() {
      this.isLoadingLists = true;
      this.$store.dispatch("getLists").then(() => {
        this.isLoadingLists = false;
      });
    },
    loadDefaultList() {
      if (this.localLists.length <= 1) {
        this.$router.push({ name: "profile" });
      } else {
        var currentListId = this.$route.query.listId;

        var listsInDescendingOrder = this._.orderBy(
          this.localLists,
          ["position", "id"],
          ["desc", "desc"]
        );

        var defaultList = this._.find(listsInDescendingOrder, function(lst) {
          return lst.id !== currentListId;
        });

        this.$router.push({ path: "list", query: { listId: defaultList.id } });
      }
    }
  }
};
</script>

<style>
#list-link-wrapper {
  max-height: calc(100vh - 320px);
  overflow: auto;
}

.list-link:nth-child(even) {
  background: #f9f9f9;
}

.list-link:hover {
  background-color: #e5b25d;
  color: white !important;
}

@media (max-height: 412px) {
  #list-link-wrapper {
    max-height: unset !important;
  }
}
</style>