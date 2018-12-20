<template>
  <div>
    <page-cover
      class="container-fluid p-4"
      background-image="https://shinestorage.azureedge.net/productlistbackgrounds/3.jpg"
    >
      <div class="forgotten-password-wrapper" v-if="!isCompleted">
        <h1 class="display-2">Reset Password</h1>
        <p
          class="lead"
        >Lets get you back into Shine, enter your email address below and we will send you some instructions.</p>
        <form
          v-on:submit.prevent="requestToken"
          class="forgotten-password-form animated fadeInDown animate-fast"
        >
          <div class="forgotten-password-input-wrapper bg-glass d-flex">
            <i class="fas fa-envelope fa-fw"/>
            <input
              type="email"
              v-model="emailAddress"
              class="flex-grow-1"
              placeholder="Email address"
              required
            >
          </div>

          <loading-button
            :is-loading="isSubmitting"
            text="Reset Password"
            :is-large="true"
            icon="fa-envelope"
          ></loading-button>
        </form>
      </div>
      <div class="forgotten-password-wrapper" v-if="isCompleted">
        <h1 class="display-1">We sent you mail!</h1>
        <p class="lead">Please check your email for a link which will help you reset your password.</p>
      </div>
    </page-cover>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      emailAddress: "",
      isSubmitting: false,
      isCompleted: false
    };
  },
  methods: {
    requestToken: function() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.status = 0;

      this.$http
        .post(`/userprofiles/requestToken`, {
          emailAddress: this.emailAddress
        })
        .then(() => {
          this.isCompleted = true;
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style scoped>
.forgotten-password-wrapper {
  margin: 0 auto;
  width: 600px;
  text-align: center;
  max-width: 100%;
}

.forgotten-password-form {
  padding-top: 40px;
}

a {
  color: white;
  text-decoration: underline;
}

a:hover {
  color: whitesmoke !important;
}

.forgotten-password-input-wrapper {
  display: block;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 5px;
  outline: none;
  font-size: 20px;
  color: white;
}

.forgotten-password-input-wrapper i {
  padding-top: 13px;
}

input {
  background-color: transparent;
  display: block;
  width: 100%;
  padding: 10px 20px;
  border: 0;
  border-radius: 5px;
  outline: none;
  font-size: 20px;
  color: white;
}
</style>