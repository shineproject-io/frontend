<template>
  <div class="alert alert-danger">{{errorMessage}}</div>
</template>

<script>
export default {
  name: "error-renderer",
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
};
</script>