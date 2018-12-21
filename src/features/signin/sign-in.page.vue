<template>
  <div>
    <page-cover class="container-fluid p-4">
      <div class="sign-in-wrapper">
        <h1 class="display-2">Sign in</h1>
        <p class="mb-5">
          <span>Welcome back, please sign in below or&nbsp;</span>
          <router-link to="/welcome/register">create a free account</router-link>
        </p>
        <form v-on:submit.prevent="signIn" class="sign-in-form animated fadeInDown animate-fast">
          <div
            class="alert alert-danger text-left"
            v-if="status > 399"
          >Sorry those credentials don't match, do you want to
            <router-link to="/welcome/forgottenpassword">reset your password?</router-link>
          </div>
          <div class="search-input-wrapper bg-glass d-flex">
            <i class="fas fa-envelope fa-fw"/>
            <input
              type="email"
              v-model="emailAddress"
              class="flex-grow-1"
              id="exampleInputEmail1"
              placeholder="Email address"
              required
            >
          </div>
          <div class="search-input-wrapper bg-glass d-flex">
            <i class="fas fa-key fa-fw"/>
            <input
              type="password"
              v-model="password"
              class="bg-glass"
              placeholder="Password"
              required
            >
          </div>
          <loading-button
            :is-loading="isSubmitting"
            text="Sign in"
            :is-large="true"
            icon="fa-sign-in-alt"
          ></loading-button>
        </form>
      </div>
    </page-cover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailAddress: "",
      password: "",
      isSubmitting: false,
      status: 0
    };
  },
  methods: {
    signIn() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.status = 0;

      this.$http
        .post(`/authentication/signin`, {
          emailAddress: this.emailAddress,
          password: this.password
        })
        .then(response => {
          window.sessionStorage.token = response.data.token;
          window.sessionStorage.expiration = response.data.expiration;
          this.$router.push({ name: "profile" });
        })
        .catch(error => {
          this.status = error.response.status;
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

a {
  color: white;
  text-decoration: underline;
}

a:hover {
  color: whitesmoke !important;
}

.alert a {
  color: black;
}

.alert a:hover {
  color: black !important;
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