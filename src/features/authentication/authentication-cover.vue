<template>
  <transition name="fade">
    <div class="authentication-cover" :style="'background-image: url(' + backgroundImage + ');'">
      <overlay class="d-flex align-items-center">
        <slot></slot>
      </overlay>
    </div>
  </transition>
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
.authentication-cover {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: white;
}

.authentication-inner {
  margin: 0 auto;
  width: 600px;
  text-align: center;
  max-width: 100%;
}
</style>