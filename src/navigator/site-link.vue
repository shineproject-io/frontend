<template>
  <div class="site-link d-flex align-items-center no-select p-4">
    <i class="menu-item-icon fas fa-sun fa-fw mr-3" style="font-size: 25px;"/>
    <div class="flex-grow-1">
      <h5 class="mb-1 font-weight-bold">Shine</h5>
      <h6 class="font-weight-light mb-0">
        <span class="mr-2">Plan tomorrow, today</span>
      </h6>
    </div>
    <a
      href="#"
      v-on:click.prevent="$emit('dismiss-menu')"
      class="sidebar-close p-2 cursor-pointer"
    >
      <i class="fas fa-times fa-fw"/>
    </a>
  </div>
</template>

<style>
.site-link {
  background-color: #f9f9f9;
}

@media (min-width: 769px) {
  .sidebar-close {
    display: none !important;
  }
}
</style>