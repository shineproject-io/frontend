<template>
  <div
    class="feature-header animated slideInDown animate-fast"
    style="background-image: url('https://shinestorage.azureedge.net/productimages/texture.png');"
  >
    <div class="container text-center text-lg-left pt-3">
      <div class="row">
        <div class="col-12 col-lg-6 pt-5 px-5">
          <div class="p-2">
            <h1 class="display-2 mt-0 mt-lg-4 mb-4">
              <i class="fas fa-sun fa-fw"/>
              <span>Shine</span>
            </h1>
            <p class="lead">Stay organised by creating to-do lists to help you finish what matters.</p>
            <p
              class="mb-5"
            >Plan a holiday or special event. Sort out your shopping list or just figure out what you need to do tomorrow.</p>
            <router-link to="/welcome/register" class="btn btn-primary py-2 px-3 mr-3 mb-3">
              <i class="fas fa-address-card fa-fw mr-2"/>
              <span>Create a free account</span>
            </router-link>
            <router-link to="/welcome/signin" class="btn btn-secondary py-2 px-3 mb-3">
              <i class="fas fa-sign-in-alt fa-fw mr-2"/>
              <span>Sign in</span>
            </router-link>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="px-4 pt-4 pb-0">
            <img
              src="https://shinestorage.azureedge.net/productimages/product-highlight.png"
              alt="product screenshot"
              style="width: 103%;"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.feature-header {
  color: $inverted-text-colour;
}
</style>