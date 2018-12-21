<template>
  <transition name="fade">
    <div class="page-cover" :style="'background-image: url(' + backgroundImage + ');'">
      <menu-activator/>
      <overlay class="d-flex align-items-center">
        <div class="container">
          <slot></slot>
        </div>
      </overlay>
    </div>
  </transition>
</template>

<script>
import menuActivator from "@/navigator/menu-activator.vue";

export default {
  name: "page-cover",
  components: {
    menuActivator
  },
  props: {
    backgroundImage: {
      type: String,
      default: "https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg"
    }
  }
};
</script>

<style>
.page-cover {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: white;
}
</style>