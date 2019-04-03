<template>
  <a
    href="#"
    v-on:click.prevent="isSubmitting = true; $emit('perform');"
    class="list-highlight list-group-item list-group-item-action rounded cursor-pointer d-flex align-items-center margin-auto p-4"
  >
    <div>
      <i v-if="isSubmitting" class="suggestion-icon fas fa-spinner fa-spin fa-fw"/>
      <i v-else class="suggestion-icon fa-fw" v-bind:class="icon"/>
    </div>
    <div class="flex-grow-1 border-left px-4">
      <h5>{{title}}</h5>
      <p class="mb-0">{{description}}</p>
    </div>
    <i class="suggestion-chevron d-none d-lg-block fas fa-chevron-right fa-fw"/>
  </a>
</template>

<script>
export default {
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
  data() {
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

.suggestion-icon {
  font-size: 30px;
  margin-right: 10px;
}

.suggestion-chevron{
  font-size: 20px;
}
</style>