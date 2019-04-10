<template>
  <div v-on:click.prevent="$root.$emit('show-menu')" class="menu-activator">
    <i class="fas fa-bars fa-fw"/>
  </div>
</template>

<style lang="scss">
.menu-activator {
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  color: $inverted-text-colour;
  z-index: 2000;
  padding: 15px 20px;

  @media (min-width: $media-ipad-portrait) {
    display: none;
  }

  i {
    font-size: 18px;
  }
}
</style>