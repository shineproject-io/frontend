<template>
  <div class="active-circle px-3 py-1" v-on:click.prevent="$emit('complete-todo-item', todoItemId)">
    <i class="far fa-circle fa-fw"></i>
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
.active-circle {
  font-size: 20px;
}

.active-circle i {
  cursor: pointer;
}

.active-circle:hover {
  color: #c0ea67;
}
</style>