<template>
  <a
    href="#"
    id="new-list-circle"
    class="addition shadow-lg"
    v-on:click.prevent="newList"
    title="Create new list"
  >
    <i v-if="!isSubmitting" class="fa fa-plus fa-fw"></i>
    <i v-if="isSubmitting" class="fa fa-spinner fa-spin fa-fw"></i>
  </a>
</template>

<script>
export default {
  name: "new-list-link",
  data() {
    return {
      isSubmitting: false
    };
  },
  methods: {
    newList() {
      if (!this.isSubmitting) {
        this.isSubmitting = true;
        this.$http
          .post(`/lists`, {
            name: `New list`,
            description: "My new list",
            imageSource:
              "https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg"
          })
          .then(response => {
            this.$root.$emit("refresh-lists");
            this.$router.push({
              path: "list",
              query: { listId: response.data }
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