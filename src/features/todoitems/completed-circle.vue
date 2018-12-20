<template>
  <div class="completed-circle px-3 py-1" v-on:click.prevent="$emit('open-todo-item', todoItemId)">
    <i class="fas fa-check-circle fa-fw"></i>
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

<style>
.completed-circle {
  color: #c0ea67;
  font-size: 20px;
}
</style>