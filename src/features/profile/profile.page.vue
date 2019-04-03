<template>
  <profile-cover>
    <div class="profile-page-wrapper">
      <div class="d-flex align-items-center mb-3">
        <div class="mr-4">
          <profile-picture-spinner
            v-if="!userProfile || userProfile.profilePicturePath === ''"
            :size="100"
          />
          <profile-picture-uploader
            v-if="userProfile && userProfile.profilePicturePath !== ''"
            :size="100"
            :canUpload="true"
            :imagePath="userProfile.profilePicturePath"
          />
        </div>
        <div class="flex-grow-1">
          <h1 class="display-2">{{welcomeMessage}}</h1>
          <p class="lead mb-0">It's time to get stuff done, so lets get cracking.</p>
        </div>
        <profile-editor v-if="userProfile" :user-profile="userProfile"/>
      </div>

      <suggestions/>
    </div>
  </profile-cover>
</template>

<script>
import profileService from '@/features/profile/profile.service.js';
import profilePictureUploader from "@/features/profile/profile-picture-uploader.vue";
import profilePictureSpinner from "@/features/profile/profile-picture-spinner.vue";
import profileEditor from "@/features/profile/profile-editor.vue";
import profileCover from "@/features/profile/profile-cover.vue";
import suggestions from "@/features/suggestions/suggestions.vue";
import { mapState } from "vuex";

export default {
  components: {
    profilePictureUploader,
    profilePictureSpinner,
    profileEditor,
    profileCover,
    suggestions
  },
  mounted() {
    this.$store.dispatch("profileModule/loadUserProfile");
    this.createWelcomeExperience();
  },
  computed: {
    ...mapState("profileModule", ["userProfile"]),
    welcomeMessage() {
      if (!this.userProfile) {
        return "Loading your Profile...";
      } else {
        return `Hi ${this.userProfile.givenName}`;
      }
    }
  },
  methods: {
    createWelcomeExperience() {
      var isWelcome = this.$route.query.welcome;

      if (!isWelcome) {
        return;
      }

      profileService.createWelcomeList().then(listId => {
        profileService.createWelcomeTodoItems(listId).then(() => {
          this.$store.dispatch("listsModule/getLists");
          this.$router.push({
            path: "list",
            query: { listId: listId }
          });
        });
      });
    }
  }
};
</script>

<style>
.profile-page-wrapper {
  width: 800px;
  max-width: 95%;
  margin: 0 auto;
}

@media (max-width: 769px) {
  .profile-page-wrapper {
    padding-top: 50px;
  }
}

.profile-switcher .nav-link {
  color: white;
}
</style>