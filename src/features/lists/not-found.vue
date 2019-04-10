<template>
  <transition name="fade">
    <div
      class="list-not-found"
      :style="'background-image: url(https://shinestorage.azureedge.net/productlistbackgrounds/6.jpg);'"
    >
      <overlay class="d-flex align-items-center">
        <div class="inner">
          <h1 class="mb-3">
            <i class="fas fa-robot"></i>
          </h1>
          <h1 class="display-2 mb-3">Something went wrong</h1>
          <p class="lead mb-4">
            <span>Sorry about that, we can't load this list. Maybe it doesn't exist, or perhaps it isn't yours.</span>
          </p>
          <router-link to="/secure/profile" class="btn btn-primary">Visit your profile</router-link>
        </div>
      </overlay>
    </div>
  </transition>
</template>

<style lang="scss">
.list-not-found {
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center center;
  color: $inverted-text-colour;
  text-align: center;

  .inner {
    margin: 0 auto;
    width: 600px;
    text-align: center;
    max-width: 100%;
  }
}
</style>