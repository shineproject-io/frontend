<template>
  <div class="text-center text-lg-left">
    <div
      class="text-white animated slideInDown animate-fast"
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
              <p
                class="lead"
              >Stay organised by creating to-do lists to help you finish what matters.</p>
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

    <div class="bg-white">
      <div class="container py-5">
        <div class="d-flex flex-column flex-column-reverse flex-lg-row align-items-center py-5">
          <div class="flex-column flex-lg-fill text-center desktop-50">
            <img
              src="https://shinestorage.azureedge.net/productimages/ideas.png"
              alt="List ideas screenshot"
              height="400"
            >
          </div>
          <div class="flex-lg-fill mb-3 desktop-50">
            <h2 class="display-3 mb-3">
              <i class="far fa-lightbulb fa-fw mr-2"/>
              <span>Instant list ideas</span>
            </h2>
            <p>Sometimes just realising that you have something to organise can be tricky, so we offer suggestions to help you stay on track.</p>
            <p>Accept a suggestion in a single click or tap, and start getting organised right away.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light">
      <div class="container py-5">
        <div class="d-flex flex-column flex-lg-row align-items-center py-5">
          <div class="flex-lg-fill mb-3 px-3 desktop-50">
            <h2 class="display-3 mb-3">
              <i class="fas fa-mobile-alt fa-fw mr-2"/>
              <span>Works on every device</span>
            </h2>
            <p>Start planning at home on your laptop, then add some to-dos in a meeting on your tablet, and finally check your progress on your phone while you are out at lunch!</p>
            <p>Your to-do lists stay in sync so you never miss a beat.</p>
          </div>

          <div class="flex-column flex-lg-fill text-center desktop-50 mb-2">
            <img
              src="https://shinestorage.azureedge.net/productimages/ipad-landscape.png"
              alt="iPad screenshot"
              style="width: 95%;"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="container py-5">
        <div class="d-flex flex-column flex-column-reverse flex-lg-row align-items-center py-5">
          <div class="flex-column flex-lg-fill text-center desktop-50">
            <img
              src="https://shinestorage.azureedge.net/productimages/customise.png"
              class="rounded"
              alt="Customise list background screenshot"
              height="400"
            >
          </div>
          <div class="flex-lg-fill mb-3 desktop-50">
            <h2 class="display-3 mb-3">
              <i class="far fa-images fa-fw mr-2"/>
              <span>Add the personal touch</span>
            </h2>
            <p>Your to-do lists should be personal, so we enable you to make them look your own, upload a photo and make your to-do list feel like home.</p>
            <p>Make every list look unique.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light">
      <div class="container py-5">
        <div class="d-flex flex-column flex-lg-row align-items-center py-5">
          <div class="flex-lg-fill px-2 mb-3 desktop-50">
            <h2 class="display-3 mb-3">
              <i class="fas fa-mobile-alt fa-fw mr-2"/>
              <span>Track your progress</span>
            </h2>
            <p>We always show you how far away you are from finishing your list. That's the goal right? To get stuff done!</p>
            <p>Add new to-dos whenever they come to mind.</p>
          </div>

          <div class="flex-column flex-lg-fill text-center desktop-50">
            <img
              src="https://shinestorage.azureedge.net/productimages/todo-progress.png"
              alt="Todo list progress screenshot"
              height="300"
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-white"
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
  </div>
</template>

<style scoped>
.desktop-50 {
  width: 50%;
}

/* iPad Landscape */
@media (max-width: 1024px) {
  .desktop-50 {
    width: 100%;
  }
}

.btn:hover {
  color: white !important;
  text-decoration: underline;
}
</style>