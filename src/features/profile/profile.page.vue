<template>
  <profile-cover background-image="https://shinestorage.azureedge.net/productlistbackgrounds/6.jpg">
    <div class="profile-page-wrapper">
      <div class="d-flex align-items-center mb-3 mb-lg-5">
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

      <div v-bind:class="{'no-events': isSubmitting}" class="p-2">
        <loading-container :is-loading="suggestions.length === 0">
          <list-suggestion
            v-for="suggestion in suggestions"
            v-bind:key="suggestion.suggestionTitle"
            :title="suggestion.suggestionTitle"
            :description="suggestion.suggestionDescription"
            :icon="suggestion.suggestionIcon"
            v-on:perform="createList(suggestion.listTitle, suggestion.listDescription, suggestion.listBackgroundImageUrl)"
          />
        </loading-container>
      </div>
    </div>
  </profile-cover>
</template>

<script>
import profilePictureUploader from "@/features/profile/profile-picture-uploader.vue";
import profilePictureSpinner from "@/features/profile/profile-picture-spinner.vue";
import profileEditor from "@/features/profile/profile-editor.vue";
import profileCover from "@/features/profile/profile-cover.vue";

export default {
  components: {
    profilePictureUploader,
    profilePictureSpinner,
    profileEditor,
    profileCover
  },
  data() {
    return {
      isSubmitting: false,
      suggestions: []
    };
  },
  mounted() {
    this.loadProfile();
    this.loadSuggestions();
    this.createWelcomeExperience();

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
    },
    welcomeMessage() {
      if (!this.userProfile) {
        return "Loading your Profile...";
      } else {
        return `Hi ${this.userProfile.givenName}`;
      }
    }
  },
  methods: {
    loadSuggestions() {
      this.$http.get("/lists/suggestions").then(response => {
        this.suggestions = response.data;
      });
    },
    createList(title, description, image) {
      this.isSubmitting = true;

      this.$http
        .post(`/lists`, {
          name: title,
          description: description,
          imageSource: image
        })
        .then(response => {
          this.$root.$emit("refresh-lists");
          this.$router.push({
            path: "list",
            query: { listId: response.data }
          });
        });
    },
    loadProfile() {
      let userProfile = this.$store.getters.userProfile;

      if (userProfile === null) {
        this.$http.get(`/userprofiles/me`).then(response => {
          this.$store.commit("setUserProfile", response.data);
        });
      }
    },
    createWelcomeExperience() {
      var isWelcome = this.$route.query.welcome;

      if (!isWelcome) {
        return;
      }

      this.$http.post("/lists/welcome").then(listResponse => {
        this.$http.post(`/lists/${listResponse.data}/welcome`).then(() => {
          this.$root.$emit("refresh-lists");
          this.$router.push({
            path: "list",
            query: { listId: listResponse.data }
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
</style>