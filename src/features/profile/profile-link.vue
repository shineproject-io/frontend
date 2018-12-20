<template>
  <div>
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
          <i class="fas fa-chevron-right fa-fw text-muted" style="font-size: 11px;"/>
        </p>
      </div>
    </router-link>
    <router-link
      v-if="!userProfile"
      to="/secure/profile"
      class="sidebar-link p-3 d-flex align-items-center"
    >
      <div style="padding: 10px;">
        <i class="fas fa-spinner fa-spin fa-fw mr-3" style="font-size: 20px;"/>
      </div>
      <div class="flex-grow-1">
        <p class="mb-0">Loading your profile...</p>
        <p href="#" class="font-weight-light mb-0">
          <span class="mr-2">Edit your profile</span>
          <i class="fas fa-chevron-right fa-fw text-muted" style="font-size: 11px;"/>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import profilePictureUploader from "@/features/profile/profile-picture-uploader.vue";
import profilePictureSpinner from "@/features/profile/profile-picture-spinner.vue";

export default {
  components: {
    profilePictureUploader,
    profilePictureSpinner
  },
  mounted: function() {
    this.loadProfile();

    this.$root.$on("user-profile-updated", () => {
      this.loadProfile();
    });
  },
  beforeDestroy: function() {
    this.$root.$off("user-profile-updated");
  },
  computed: {
    userProfile: function() {
      return this.$store.getters.userProfile;
    }
  },
  methods: {
    loadProfile: function() {
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