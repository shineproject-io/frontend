<template>
  <div v-on:click.prevent="$root.$emit('show-menu')" class="menu-activator">
    <i class="fas fa-bars fa-fw mr-1"/>
    <span>Shine</span>
  </div>
</template>

<style>
.menu-activator {
  position: relative;
  cursor: pointer;
  color: white;
  z-index: 2000;
  padding: 15px 20px;
}

@media (min-width: 769px) {
  .menu-activator {
    display: none !important;
  }
}

.menu-activator i {
  font-size: 18px !important;
}

.menu-activator span {
  font-weight: bold;
}
</style>