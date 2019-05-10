<template>
  <div class="position-relative bg-light">
    <div
      v-if="slide === 1"
      class="slide"
      style="background-image: url('https://shinestorage.azureedge.net/productimages/simple.jpg'); background-size: cover; background-position: center center;"
    >
      <overlay>
        <h2 class="display-2">Simple to use</h2>
        <p
          class="lead"
        >We designed Shine to be as simple to use as possible, it really focuses you on actually getting stuff done.</p>

        <img
          src="https://shinestorage.azureedge.net/productimages/unlimited-todos.png"
          class="animated animate-fast fadeInDown"
          style="margin: 10px;width: 60%;"
        >

        <div class="footer">
          <p class="lead">
            <i class="fas fa-info-circle fa-fw"/>Did you know: you can create unlimited lists and todo's, No restrictions.
          </p>
        </div>
      </overlay>
    </div>
    <div
      v-if="slide === 2"
      class="slide"
      style="background-image: url('https://shinestorage.azureedge.net/productimages/improving.jpg');  background-size: cover; background-position: center center; padding: 0 20px;"
    >
      <overlay>
        <h2 class="display-2">Always improving</h2>
        <p
          class="lead"
        >Anybody can give us feedback on Shine, so if you know how we can improve, let us know and we might just do it!</p>

        <img
          src="https://shinestorage.azureedge.net/productimages/feedback.png"
          class="animated animate-fast fadeInDown"
          style="margin: 10px; height: 250px;"
        >
        <div class="footer">
          <p class="lead">
            <i class="fas fa-info-circle fa-fw"/>Did you know: You can give us feedback at any time using the feedback button.
          </p>
        </div>
      </overlay>
    </div>
    <div
      v-if="slide === 3"
      class="slide"
      style="background-image: url('https://shinestorage.azureedge.net/productimages/free.jpg'); background-size: cover; background-position: center center;"
    >
      <overlay>
        <h2 class="display-2">Completely free</h2>
        <p
          class="lead"
        >Shine is not for profit, that means you couldn't pay for any of our features even if you wanted too.</p>

        <p
          class="lead mb-5"
        >No monthly subscriptions, no one off costs, but you don't pay with your privacy or data either.</p>

        <div class="mb-4 d-none d-md-block">
          <router-link to="/welcome/register" class="btn btn-lg btn-primary py-2 px-3 mr-3 mb-3">
            <i class="fas fa-address-card fa-fw mr-2"/>
            <span>Create a free account</span>
          </router-link>
          <router-link to="/welcome/signin" class="btn btn-lg btn-secondary py-2 px-3 mb-3">
            <i class="fas fa-sign-in-alt fa-fw mr-2"/>
            <span>Sign in</span>
          </router-link>
        </div>

        <div class="footer">
          <p class="lead">
            <i class="fas fa-info-circle fa-fw"/>Did you know: all our code is public and available on GitHub
          </p>
        </div>
      </overlay>
    </div>
    <div
      class="chevron chevron-left"
      v-on:click="decrement"
      v-bind:class="[{'disabled': slide === 1}]"
    >
      <i class="fas fa-chevron-left"/>
    </div>
    <div
      class="chevron chevron-right"
      v-on:click="increment"
      v-bind:class="[{'disabled': slide === 3}]"
    >
      <i class="fas fa-chevron-right"/>
    </div>
  </div>
</template>     
    
<script>
export default {
  data() {
    return {
      slide: 1
    };
  },
  methods: {
    increment() {
      this.slide++;
    },
    decrement() {
      this.slide--;
    }
  }
};
</script>

<style lang="scss">
.chevron {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2000;
  margin-top: 230px;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease-in-out;

  &.chevron-left {
    left: 0;
    margin-left: 15px;
  }
  &.chevron-right {
    right: 0;
    margin-right: 15px;
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  i {
    font-size: 20px;
    background-color: white;
    color: black;
    border-radius: 50%;
    padding: 10px 15px;
  }
}
.slide {
  position: relative;
  min-height: 550px;
  color: white;
  text-align: center;
  padding: 50px;

  @media (max-width: $media-ipad-portrait) {
    min-height: 400px;
  }

  img {
    @media (max-width: $media-ipad-portrait) {
      display: none;
    }
  }
  .overlay {
    text-align: center;
    padding: 50px;
  }

  .footer {
    border-top: 1px dashed $primary-border-colour;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    i {
      margin-right: 10px;
    }
  }

  h2 {
    margin-bottom: 20px;
  }
}
</style>