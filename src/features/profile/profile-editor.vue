<template>
  <transition name="fade">
    <div class="d-none d-md-block">
      <a href="#" class="profile-editor-link" v-on:click.prevent="$refs.profileDetailsModal.show()">
        <i class="fas fa-cog fa-fw" style="font-size: 35px;"/>
      </a>
      <form v-on:submit.prevent="save">
        <modal ref="profileDetailsModal">
          <h6 slot="header" class="mb-0">Update your profile</h6>
          <div slot="body" class="p-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">First name</span>
              </div>
              <input type="text" v-model="updatedGivenName" class="form-control" required>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Last name</span>
              </div>
              <input type="text" v-model="updatedFamilyName" class="form-control" required>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Email address</span>
              </div>
              <input type="email" v-model="updatedEmailAddress" class="form-control" required>
            </div>

            <div v-if="showDeleteWarning" class="card card-body text-danger animated slideInDown">
              <p>Deleting your account is permanent and immediate, if you delete your account all your data held in our systems will be removed immediately</p>
              <div class="d-flex">
                <a href="#" class="btn btn-danger mr-2" v-on:click.prevent="deleteAccount">
                  <i class="fas fa-exclamation-triangle fa-fw mr-2"/>
                  <span>Confirm Deletion</span>
                </a>
                <a href="#" class="btn btn-secondary" v-on:click.prevent="showDeleteWarning = false;">Cancel</a>
              </div>
            </div>
          </div>
          <div slot="footer">
            <button v-if="!showDeleteWarning" class="btn btn-secondary mr-2 float-left" v-on:click.prevent="showDeleteWarning = true;">
              <i class="fas fa-exclamation-triangle fa-fw mr-2"/>Delete Account
            </button>
            <loading-button :isLoading="isSubmitting" text="Save" icon="fas fa-check" class="mr-2"></loading-button>
            <button
              class="btn btn-secondary"
              v-on:click.prevent="$refs.profileDetailsModal.hide()"
            >Cancel</button>
          </div>
        </modal>
      </form>
    </div>
  </transition>
</template>

<script>
import profileService from '@/features/profile/profile.service.js';

export default {
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSubmitting: false,
      showDeleteWarning: false,
      updatedGivenName: "",
      updatedFamilyName: "",
      updatedEmailAddress: ""
    };
  },
  mounted() {
    this.updatedGivenName = this.userProfile.givenName;
    this.updatedFamilyName = this.userProfile.familyName;
    this.updatedEmailAddress = this.userProfile.emailAddress;
  },
  methods: {
    save() {
      this.isSubmitting = true;

      if (
        this.updatedGivenName !== this.userProfile.givenName ||
        this.updatedFamilyName !== this.userProfile.familyName ||
        this.updatedEmailAddress !== this.userProfile.emailAddress
      ) {
        this.$http
          .put("/userprofiles/me/name", {
            givenName: this.updatedGivenName,
            familyName: this.updatedFamilyName
          })
          .then(() => {
            this.$http
              .put("/userprofiles/me/emailaddress", {
                emailAddress: this.updatedEmailAddress
              })
              .then(function() {
                this.isSubmitting = false;
                this.$refs.profileDetailsModal.hide();
                this.$store.dispatch("profileModule/loadUserProfile", true);
              });
          });
      } else {
        this.isSubmitting = false;
        this.$refs.profileDetailsModal.hide();
      }
    },
    deleteAccount() {
      this.isSubmitting = true;

      profileService.delete().then(() => {
        this.$store.dispatch("authenticationModule/signOut");
        this.$store.dispatch("listsModule/signOut");
        this.$store.dispatch("todoModule/signOut");
        this.$store.dispatch("profileModule/signOut");
        this.$store.dispatch("suggestionsModule/signOut");
        this.$router.push({ name: "features" });
      });
    }
  }
};
</script>

<style>
a.profile-editor-link {
  color: white !important;
}
</style>