<template>
  <div class="profile-cover" :style="'background-image: url(https://shinestorage.azureedge.net/productlistbackgrounds/6.jpg);'">
    <div class="profile-cover-inner">
      <overlay class="d-flex align-items-center"/>
      <div class="position-relative" style="z-index: 2001;">
        <div class="container py-2 py-md-4 py-lg-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile-cover {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: $inverted-text-colour;
}
.profile-cover-inner {
  max-height: 100vh;
  overflow-y: auto;
}
</style>