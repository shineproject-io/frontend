<template>
  <div class="profile-cover text-white" :style="'background-image: url(' + backgroundImage + ');'">
    <div class="profile-cover-inner">
      <overlay class="d-flex align-items-center"/>
      <div class="position-relative" style="z-index: 2001;">
        <div class="container py-2 py-md-4 py-lg-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: "https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg"
    }
  }
};
</script>

<style>
.profile-cover {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
}
.profile-cover-inner {
  max-height: 100vh;
  overflow-y: auto;
}
</style>