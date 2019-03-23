<template>
  <a
    href="#"
    id="new-list-circle"
    class="addition shadow-lg"
    v-on:click.prevent="newList"
    title="Create new list"
  >
    <i v-if="!isSubmitting" class="fa fa-plus fa-fw"/>
    <i v-if="isSubmitting" class="fa fa-spinner fa-spin fa-fw"/>
  </a>
</template>

<script>
import listService from '@/features/lists/lists.service.js';

export default {
  data() {
    return {
      isSubmitting: false
    };
  },
  methods: {
    newList() {
      if (!this.isSubmitting) {
        this.isSubmitting = true;

        listService.create('New list', 'My new list', 'https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg')
          .then(listId => {
            this.$store.dispatch('listsModule/getLists');
            this.$router.push({
              path: "list",
              query: { listId: listId }
            });
            this.isSubmitting = false;
          });
      }
    }
  }
};
</script>

<style>
.addition {
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  padding: 12px 14px;
  background-color: #db5461;
  color: white;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out;
  z-index: 2005;
}

.addition:hover {
  color: white;
  background-color: #e5b25d;
}
</style>