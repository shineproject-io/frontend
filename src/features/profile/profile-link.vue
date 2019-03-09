<template>
  <router-link
    v-if="userProfile"
    to="/secure/profile"
    class="sidebar-link p-3 d-flex align-items-center"
  >
    <profile-picture-uploader
      :size="40"
      :can-upload="false"
      :imagePath="userProfile.profilePicturePath"
      class="mr-3"
    />
    <div class="flex-grow-1">
      <p class="mb-0">{{userProfile.displayName}}</p>
      <p href="#" class="font-weight-light mb-0">
        <span class="mr-2">Edit your profile</span>
        <i class="sidebar-chevron fas fa-chevron-right fa-fw text-muted"/>
      </p>
    </div>
  </router-link>

  <router-link v-else to="/secure/profile" class="sidebar-link p-3 d-flex align-items-center">
    <div class="profile-loading-wrapper">
      <i class="profile-loading-icon fas fa-spinner fa-spin fa-fw mr-3"/>
    </div>
    <div class="flex-grow-1">
      <p class="mb-0">Loading your profile...</p>
      <p href="#">
        <span class="mr-2">Edit your profile</span>
        <i class="sidebar-chevron fas fa-chevron-right fa-fw text-muted"/>
      </p>
    </div>
  </router-link>
</template>

<script>
import profilePictureUploader from "@/features/profile/profile-picture-uploader.vue";
import profilePictureSpinner from "@/features/profile/profile-picture-spinner.vue";

export default {
  components: {
    profilePictureUploader,
    profilePictureSpinner
  },
  mounted() {
    this.loadProfile();

    this.$root.$on("user-profile-updated", () => {
      this.loadProfile();
    });
  },
  beforeDestroy() {
    this.$root.$off("user-profile-updated");
  },
  computed: {
    userProfile() {
      return this.$store.getters.userProfile;
    }
  },
  methods: {
    loadProfile() {
      let userProfile = this.$store.getters.userProfile;

      if (userProfile == null) {
        this.$http.get(`/userprofiles/me`).then(response => {
          this.$store.commit("setUserProfile", response.data);
        });
      }
    }
  }
};
</script>

<style>
.profile-loading-wrapper {
  padding: 10px;
}

.profile-loading-icon {
  font-size: 20px;
}
</style>