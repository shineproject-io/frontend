<template>
  <div
    class="feature-header animated slideInDown animate-fast"
    style="background-image: url('https://shinestorage.azureedge.net/productimages/texture.png');"
  >
    <div class="feature-header container text-center">
      <img src="https://shinestorage.azureedge.net/productimages/logo.png" class="mb-5" width="200">

      <p
        class="lead mb-5"
      >Stay organised by creating to-do lists that help you finish what really matters.</p>
     
      <div class="mb-4">
        <router-link to="/welcome/register" class="btn btn-primary py-2 px-3 mr-3 mb-3">
          <i class="fas fa-address-card fa-fw mr-2"/>
          <span>Create a free account</span>
        </router-link>
        <router-link to="/welcome/signin" class="btn btn-secondary py-2 px-3 mb-3">
          <i class="fas fa-sign-in-alt fa-fw mr-2"/>
          <span>Sign in</span>
        </router-link>
      </div>

      <img
        src="https://shinestorage.azureedge.net/productimages/laptop-front.png"
        class="mb-5"
        style="width: 60%;"
      >
    </div>
  </div>
</template>

<style lang="scss">
.feature-header {
  color: $inverted-text-colour;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>