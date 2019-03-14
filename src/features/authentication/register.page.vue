<template>
  <page-cover
    class="container-fluid p-4"
    background-image="https://shinestorage.azureedge.net/productlistbackgrounds/2.jpg"
  >
    <div class="sign-in-wrapper">
      <h1 class="display-2">Create an account</h1>
      <p
        class="mb-0"
      >We don't need your life story or your money, just a few details to get started.
        <router-link to="/welcome/signin">Or Sign In</router-link>
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
            id="exampleInputEmail1"
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
            id="exampleInputPassword1"
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
  </page-cover>
</template>

<script>
import authenticationService from "@/features/authentication/authentication.service.js";

export default {
  data() {
    return {
      emailAddress: "",
      password: "",
      givenName: "",
      familyName: "",
      isSubmitting: false,
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

      this.$http
        .post(`/userprofiles`, {
          emailAddress: this.emailAddress,
          password: this.password,
          givenName: this.givenName,
          familyName: this.familyName,
          profilePicturePath: `${
            process.env.VUE_APP_STORAGE_BASE_URL
          }/productimages/medium-avatar.png`
        })
        .then(() => {
          authenticationService
            .signIn(this.emailAddress, this.password)
            .then(response => {
              window.sessionStorage.token = response.token;
              window.sessionStorage.expiration = response.expiration;
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
.sign-in-wrapper {
  margin: 0 auto;
  width: 600px;
  text-align: center;
  max-width: 100%;
}

.sign-in-form {
  padding-top: 40px;
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