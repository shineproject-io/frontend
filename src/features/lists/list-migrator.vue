<template>
  <modal ref="listMigratorModal">
    <h6 slot="header" class="mb-0">Move open to-dos</h6>
    <div slot="body" class="p-3">
      <p>Which list would you like to move your active to-do's into?</p>

      <div class="card">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item list-group-item-action cursor-pointer p-3"
            v-for="list in otherLists"
            v-bind:key="list.id"
            v-on:click.prevent="submit(list.id)"
          >
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <h6 class="mb-1">{{list.name}}</h6>
                <small class="mb-0 text-muted">{{list.description}}.</small>
              </div>
              <i class="fas fa-chevron-circle-right fa-fw p-3"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>

<script>
import listService from '@/features/lists/lists.service.js';
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      isSubmitting: false
    };
  },
  computed: {
    ...mapState("listsModule", ["lists", "currentList"]),
    ...mapGetters("listsModule", ["otherLists"])
  },
  methods: {
    show() {
      this.$refs.listMigratorModal.show();
    },
    submit(newListId) {
      this.isSubmitting = true;

      listService.migrate(this.currentList.id, newListId)
        .then(() => {
          this.$refs.listMigratorModal.hide();
          this.$store.dispatch("todoModule/getTodoItems", this.currentList.id);
          this.isSubmitting = false;
        });
    }
  }
};
</script>