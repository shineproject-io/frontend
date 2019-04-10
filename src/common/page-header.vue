<template>
  <transition name="fade">
    <div class="page-header" :style="'background-image: url(' + backgroundImage + ');'">
      <overlay class="d-flex align-items-center">
        <div class="inner">
          <slot></slot>
        </div>
      </overlay>
    </div>
  </transition>
</template>

<script>
export default {
  name: "page-header",
  props: {
    backgroundImage: {
      type: String,
      default: "https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg"
    }
  }
};
</script>

<style lang="scss">
.page-header {
  height: 275px;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: $inverted-text-colour;

  @media (max-width: $media-ipad-portrait) {
    height: 325px;
  }

  .inner {
    padding: 60px;
    width: 100%;

    @media (max-width: $media-ipad-portrait) {
      padding: 15px;
    }
  }
}
</style>