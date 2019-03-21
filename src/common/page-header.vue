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

<style>
.page-header {
  height: 275px;
  position: relative;
  background-size: cover;
  background-position: center center;
}

.page-header .inner {
  padding: 60px;
  width: 100%;
}

/* iPad Portrait */
@media (max-width: 767px) {
  .page-header {
    height: 325px;
  }

  .page-header .inner {
    padding: 15px;
  }
}
</style>