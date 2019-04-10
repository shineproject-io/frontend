<template>
  <div
    class="feature-footer"
    style="background-image: url('https://shinestorage.azureedge.net/productimages/texture.png');"
  >
    <div class="container text-center text-lg-left p-5">
      <div class="row py-4">
        <div class="col-12 col-lg-6 mb-4">
          <div>
            <img
              src="https://shinestorage.azureedge.net/productimages/laptop-front.png"
              alt="Surface book screenshot"
              style="width: 100%;"
            >
          </div>
        </div>
        <div class="col-12 col-lg-6 px-3">
          <div class="p-2">
            <h1 class="display-2">
              <span>Are you ready?</span>
            </h1>
            <p
              class="lead"
            >Maturity is realising the difference between a wishlist and a to-do list.</p>
            <p
              class="mb-5"
            >Shine is totally free to use, we don't show you adverts or sell your data.</p>
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
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.feature-footer {
  color: $inverted-text-colour;
}
</style>