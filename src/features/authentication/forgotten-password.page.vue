<template>
  <authentication-cover
    background-image="https://shinestorage.azureedge.net/productlistbackgrounds/3.jpg"
  >
    <div class="authentication-inner" v-if="!isCompleted">
      <h1 class="display-1">Reset Password</h1>
      <p
        class="lead"
      >Lets get you back into Shine, enter your email address below and we will email you a recovery link.</p>
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
        />
      </form>
    </div>
    <div class="forgotten-password-wrapper" v-if="isCompleted">
      <h1 class="display-1">We sent you mail!</h1>
      <p class="lead">Please check your email for a link which will help you reset your password.</p>
    </div>
  </authentication-cover>
</template>

<script>
import authenticationService from "@/features/authentication/authentication.service.js";
import authenticationCover from '@/features/authentication/authentication-cover.vue';

export default {
  components: {
    authenticationCover
  },
  data() {
    return {
      emailAddress: "",
      isSubmitting: false,
      isCompleted: false
    };
  },
  methods: {
    requestToken() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.status = 0;

      authenticationService
        .changePasswordTokenRequest(this.emailAddress)
        .then(() => {
          this.isCompleted = true;
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.forgotten-password-form {
  padding-top: 40px;
}

a {
  color: $inverted-text-colour;
  text-decoration: underline;
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
  color: $inverted-text-colour;
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
  color: $inverted-text-colour;
}
</style>