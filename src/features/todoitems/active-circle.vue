<template>
  <div class="todo-circle px-3 py-1" v-on:click.prevent="$emit('complete-todo-item', todoItemId)">
    <i class="far fa-circle fa-fw"/>
  </div>
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