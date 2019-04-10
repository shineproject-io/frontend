<template>
  <div class="profile-cover" :style="'background-image: url(' + backgroundImage + ');'">
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
  computed: {
    backgroundImage() {
      if (new Date().getHours() < 12) {
        return "https://listsstorage.blob.core.windows.net/productimages/morning.jpg";
      }
      
      return "https://listsstorage.blob.core.windows.net/productimages/evening.jpg";
    }
  }
};
</script>

<style lang="scss">
.profile-cover {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: $inverted-text-colour;
}
.profile-cover-inner {
  max-height: 100vh;
  overflow-y: auto;
}
</style>