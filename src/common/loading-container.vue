<template>
  <div>
    <div v-if="isLoading" class="text-center p-4">
      <i class="fas fa-spinner fa-spin fa-fw mb-2"/>
      <p
        v-if="messageSuffix !== ''"
        class="text-muted"
      >Bear with us, we are loading your {{messageSuffix}}</p>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: "loading-container",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    messageSuffix: {
      type: String,
      default: ""
    }
  }
};
</script>