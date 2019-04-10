<template>
  <router-link
    :to="'/secure/list?listId=' + id"
    :title="name"
    class="list-link d-block text-truncate"
    exact
  >
    <i class="fas fa-list fa-fw mr-2 px-3 py-1" style="font-size: 14px;"/>
    <span>{{name}}</span>
  </router-link>
</template>

<script>
export default {
  name: "side-menu",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.list-link {
  border-left: 4px solid transparent;
  transition: border-color 0.2s ease-in-out;
  color: $default-text-colour;
  border-radius: 2px;
  padding: 15px;
}

.list-link:hover {
  text-decoration: none;
}

.list-link:hover:not(.active) {
  border-left: 4px solid $brand-secondary-colour;
}

.list-link.active {
  border-left: 4px solid $brand-highlight-secondary-colour;
}
</style>