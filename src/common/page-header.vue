<template>
  <transition name="fade">
    <div class="page-header" :style="'background-image: url(' + backgroundImage + ');'">
      <menu-activator/>
      <overlay class="d-flex align-items-center">
        <div class="inner">
          <slot></slot>
        </div>
      </overlay>
    </div>
  </transition>
</template>

<script>
import menuActivator from "@/navigator/menu-activator.vue";

export default {
  name: "page-header",
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