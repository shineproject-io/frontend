<template>
  <authentication-cover
    background-image="https://shinestorage.azureedge.net/productlistbackgrounds/2.jpg"
  >
    <div class="authentication-inner">
      <h1 class="display-1">Create an account</h1>
      <p class="lead mb-0">Welcome to Shine, please enter a few details below to get started.</p>
      <p class="lead mb-0">
        If you already have an account
        <router-link to="/welcome/signin">Sign In</router-link>
      </p>

      <form
        v-on:submit.prevent="createAccount"
        class="sign-in-form animated fadeInDown animate-fast"
      >
        <div class="alert alert-danger text-left" v-if="status === 404">Invalid credentials</div>
        <div class="alert alert-danger text-left" v-if="status === 500">Invalid credentials</div>
        <div class="search-input-wrapper bg-glass d-flex">
          <i class="fas fa-pen-nib fa-fw"/>
          <input
            type="text"
            v-model="givenName"
            class="bg-glass"
            placeholder="Your first name"
            required
          >
        </div>
        <div class="search-input-wrapper bg-glass d-flex">
          <i class="fas fa-pen-nib fa-fw"/>
          <input
            type="text"
            v-model="familyName"
            class="bg-glass"
            placeholder="Your second name"
            required
          >
        </div>
        <div class="search-input-wrapper bg-glass d-flex">
          <i class="fas fa-envelope fa-fw"/>
          <input
            type="email"
            v-model="emailAddress"
            class="flex-grow-1"
            placeholder="Enter your email address"
            required
          >
        </div>
        <div class="search-input-wrapper bg-glass d-flex">
          <i class="fas fa-key fa-fw"/>
          <input
            type="password"
            v-model="password"
            class="bg-glass"
            placeholder="Choose your password"
            required
          >
        </div>
        <loading-button
          :is-loading="isSubmitting"
          text="Create account"
          :is-large="true"
          icon="fa-address-card"
        ></loading-button>
      </form>
    </div>
  </authentication-cover>
</template>

<script>
import authenticationService from "@/features/authentication/authentication.service.js";
import userFields from "@/features/authentication/user-fields.mixin.js";
import authenticationCover from "@/features/authentication/authentication-cover.vue";

export default {
  components: {
    authenticationCover
  },
  mixins: [userFields],
  data() {
    return {
      status: 0
    };
  },
  methods: {
    createAccount() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.status = 0;

      authenticationService
        .register(
          this.givenName,
          this.familyName,
          this.emailAddress,
          this.password
        )
        .then(() => {
          var signInFields = {
            emailAddress: this.emailAddress,
            password: this.password
          };

          this.$store
            .dispatch("authenticationModule/signIn", signInFields)
            .then(() => {
              this.$router.push({
                path: "/secure/profile",
                query: { welcome: true }
              });
            });
        })
        .catch(() => {
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style scoped>
.sign-in-form {
  padding-top: 30px;
}

a {
  color: white;
  text-decoration: underline;
}

a:hover {
  color: whitesmoke !important;
}

.search-input-wrapper {
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

.search-input-wrapper i {
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