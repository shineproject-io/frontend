<template>
  <div class="page-cover text-white" :style="'background-image: url(' + backgroundImage + ');'">
    <menu-activator></menu-activator>
    <overlay class="d-flex align-items-center"/>
    <div class="position-relative" style="z-index: 2001;">
      <div class="container py-2 py-md-4 py-lg-5">
        <slot></slot>
      </div>
    </div>
  </div>
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
}
</style>