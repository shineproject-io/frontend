<template>
  <modal ref="listMigratorModal">
    <h6 slot="header" class="mb-0">Move open to-dos</h6>
    <div slot="body" class="p-3">
      <loading-container :is-loading="isLoading || isSubmitting">
        <p
          class
        >We can help you to move all active to-dos in this list into another, simply select the list you want to move them too.</p>

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
      </loading-container>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    listId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      otherLists: [],
      isLoading: true,
      isSubmitting: false
    };
  },
  methods: {
    show() {
      this.$refs.listMigratorModal.show();

      this.isLoading = true;
      this.isSubmitting = false;

      this.$http.get(`/lists`).then(response => {
        var otherListsTemporary = this._.orderBy(
          response.data,
          ["position", "name"],
          ["asc", "desc"]
        );

        this.otherLists = this._.filter(otherListsTemporary, lst => {
          return lst.id !== this.listId;
        });

        this.isLoading = false;
      });
    },
    submit: function(newListId) {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      this.$http
        .post(`/lists/${this.listId}/migrate`, { NewListId: newListId })
        .then(() => {
          this.$refs.listMigratorModal.hide();
          this.$root.$emit("refresh-todo-list");
        });
    }
  }
};
</script>