<template>
  <i
    class="todo-circle far fa-circle fa-fw"
    v-on:click.prevent="$emit('complete-todo-item', todoItemId)"
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