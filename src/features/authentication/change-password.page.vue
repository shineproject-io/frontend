<template>
  <authentication-cover
    background-image="https://shinestorage.azureedge.net/productlistbackgrounds/3.jpg"
  >
    <div class="authentication-inner" v-if="token">
      <h1 class="display-2">Change Password</h1>
      <p class="lead">We are sorry to see you locked out, change your password below to get back in!</p>

      <form
        v-on:submit.prevent="changePassword"
        class="change-password-form animated fadeInDown animate-fast"
      >
        <div class="alert alert-danger text-left" v-if="status === 404">We can't verify your token</div>
        <div
          class="alert alert-danger text-left"
          v-if="status === 400"
        >Are you sure you typed your email address correctly?</div>
        <div class="alert alert-danger text-left" v-if="status === 500">Something went wrong</div>

        <div class="change-password-input-wrapper bg-glass d-flex">
          <i class="fas fa-envelope fa-fw"/>
          <input
            type="email"
            v-model="emailAddress"
            class="flex-grow-1"
            placeholder="Email address"
            required
          >
        </div>
        <div class="change-password-input-wrapper bg-glass d-flex">
          <i class="fas fa-key fa-fw"/>
          <input
            type="password"
            v-model="password"
            class="bg-glass"
            placeholder="Password"
            required
          >
        </div>
        <div class="change-password-input-wrapper bg-glass d-flex">
          <i class="fas fa-key fa-fw"/>
          <input
            type="password"
            v-model="confirmPassword"
            class="bg-glass"
            placeholder="Confirm Password"
            required
          >
        </div>
        <loading-button
          :is-loading="isSubmitting"
          text="Change Password"
          :is-large="true"
          icon="fa-chevron-right"
        ></loading-button>
      </form>
    </div>

    <div v-else class="change-password-wrapper">
      <h1 class="display-1">Invalid Token</h1>
      <p class="lead">Sorry we don't recognise the token you used for this request</p>
    </div>
  </authentication-cover>
</template>

<script>
import authenticationService from "@/features/authentication/authentication.service.js";
import authenticationCover from "@/features/authentication/authentication-cover.vue";

export default {
  components: {
    authenticationCover
  },
  data() {
    return {
      token: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      isSubmitting: false,
      status: 0
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    changePassword() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.status = 0;

      authenticationService
        .completePasswordRequest(this.emailAddress, this.password, this.token)
        .then(() => {
          this.$router.push({ name: "sign-in" });
        })
        .catch(error => {
          this.status = error.response.status;
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.change-password-form {
  padding-top: 40px;
}

a {
  color: $inverted-text-colour;
  text-decoration: underline;
}

.change-password-input-wrapper {
  display: block;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 5px;
  outline: none;
  font-size: 20px;
  color: $inverted-text-colour;
}

.change-password-input-wrapper i {
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
  color: $inverted-text-colour;
}
</style>