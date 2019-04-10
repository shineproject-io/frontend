<template>
  <transition name="fade">
    <div v-if="isVisible">
      <div class="c-modal-overlay position-fixed" v-on:click="hide"/>

      <div class="c-modal border rounded">
        <div class="c-modal-inner">
          <div class="c-modal-header d-flex align-items-center border-bottom px-2">
            <div class="flex-grow-1">
              <slot name="header"/>
            </div>
            <i class="fas fa-times fa-fw p-3 mr-2 cursor-pointer" v-on:click="hide"/>
          </div>

          <div class="c-modal-body">
            <slot name="body"/>
          </div>

          <div class="c-modal-footer p-2 text-right border-top">
            <slot name="footer">
              <button class="btn btn-secondary" v-on:click="hide">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    }
  }
};
</script>

<style lang="scss">
.c-modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.5);
}

.c-modal {
  position: fixed;
  width: 600px;
  max-width: 90vw;
  margin: 0 auto;
  z-index: 3001;
  margin-top: 30px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: $primary-background-colour
}

.c-modal-inner {
  min-height: 100px;
  color: $primary-text-colour !important;
}

.c-modal-body {
  max-height: 60vh;
  overflow: auto;
}
</style>