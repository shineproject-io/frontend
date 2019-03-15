<template>
  <profile-cover :background-image="backgroundImage">
    <menu-activator/>

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

      <loading-container :is-loading="isLoading" class="p-2 mb-4">
        <ul class="profile-switcher nav nav-tabs mb-3">
          <li class="nav-item nav-link cursor-pointer active">
            <i class="fas fa-lightbulb fa-fw mr-1"/>
            <span>List ideas</span>
          </li>
        </ul>

        <div v-bind:class="{'no-events': isSubmitting}">
          <list-suggestion
            v-for="suggestion in suggestions"
            v-bind:key="suggestion.suggestionTitle"
            :title="suggestion.suggestionTitle"
            :description="suggestion.suggestionDescription"
            :icon="suggestion.suggestionIcon"
            v-on:perform="createList(suggestion.listTitle, suggestion.listDescription, suggestion.listBackgroundImageUrl)"
          />
        </div>
      </loading-container>
    </div>
  </profile-cover>
</template>

<script>
import menuActivator from "@/navigator/menu-activator.vue";
import profilePictureUploader from "@/features/profile/profile-picture-uploader.vue";
import profilePictureSpinner from "@/features/profile/profile-picture-spinner.vue";
import profileEditor from "@/features/profile/profile-editor.vue";
import profileCover from "@/features/profile/profile-cover.vue";
import { mapState } from "vuex";

export default {
  components: {
    profilePictureUploader,
    profilePictureSpinner,
    profileEditor,
    profileCover,
    menuActivator
  },
  data() {
    return {
      isSubmitting: false,
      isLoading: true,
      suggestions: []
    };
  },
  mounted() {
    this.$store.dispatch("profileModule/loadUserProfile");
    this.loadContentPanel();
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
    },
    backgroundImage() {
      return "https://shinestorage.azureedge.net/productlistbackgrounds/6.jpg";
    }
  },
  methods: {
    loadContentPanel() {
      this.$http.get("/lists/suggestions").then(response => {
        this.suggestions = response.data;
        this.isLoading = false;
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
          this.$store.dispatch("listsModule/getLists");
          this.$router.push({
            path: "list",
            query: { listId: response.data }
          });
        });
    },
    createWelcomeExperience() {
      var isWelcome = this.$route.query.welcome;

      if (!isWelcome) {
        return;
      }

      this.$http.post("/lists/welcome").then(listResponse => {
        this.$http.post(`/lists/${listResponse.data}/welcome`).then(() => {
          this.$store.dispatch("listsModule/getLists");
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

@media (max-width: 769px) {
  .profile-page-wrapper {
    padding-top: 50px;
  }
}

.profile-switcher .nav-link {
  color: white;
}
</style>