<template>
  <i
    class="todo-circle completed-circle fas fa-check-circle fa-fw"
    v-on:click.prevent="$emit('open-todo-item', todoItemId)"
  />
</template>

<script>
export default {
  props: {
    todoItemId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.completed-circle {
  color: #c0ea67;
}
</style>