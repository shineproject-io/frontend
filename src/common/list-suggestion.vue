<template>
  <a
    href="#"
    v-on:click.prevent="isSubmitting = true; $emit('perform');"
    class="list-highlight list-group-item list-group-item-action rounded cursor-pointer d-flex align-items-center margin-auto p-4"
  >
    <div class>
      <i
        v-if="isSubmitting"
        class="fas fa-spinner fa-spin fa-fw"
        style="font-size: 35px;margin-right: 10px;"
      />
      <i v-else v-bind:class="icon" class="fa-fw" style="font-size: 35px;margin-right: 10px;"/>
    </div>
    <div class="flex-grow-1 border-left px-4">
      <h5>{{title}}</h5>
      <p class="mb-0">{{description}}</p>
    </div>
    <i class="d-none d-lg-block fas fa-chevron-right fa-fw" style="font-size: 20px;"/>
  </a>
</template>

<script>
export default {
  name: "list-suggestion",
  props: {
    title: {
      Type: String,
      required: true
    },
    description: {
      Type: String,
      required: true
    },
    icon: {
      Type: String,
      Required: true
    }
  },
  data: function() {
    return {
      isSubmitting: false
    };
  }
};
</script>

<style>
.list-highlight {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>