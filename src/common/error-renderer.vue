<template>
  <div>
    <div class="alert alert-danger">{{errorMessage}}</div>
  </div>
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