<template>
  <div>
    <profile-cover
      background-image="https://shinestorage.azureedge.net/productlistbackgrounds/6.jpg"
    >
      <div class style="width: 800px; max-width: 95%; margin: 0 auto;">
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
          <list-suggestion
            title="Want a blank list?"
            description="How about a fresh canvas to start jotting down your thoughts."
            icon="fas fa-plus"
            v-on:perform="createList('New list', 'My new list', 'https://shinestorage.azureedge.net/productlistbackgrounds/1.jpg')"
          />
          <list-suggestion
            title="Planning to hit the supermarket?"
            description="Lets create a shopping list so you can jot down the things you need to get"
            icon="fas fa-shopping-basket"
            v-on:perform="createList('Shopping list', 'Lets remember to buy these items when we get to the supermarket', 'https://shinestorage.azureedge.net/bespokebackgrounds/shopping.jpg')"
          />
          <list-suggestion
            title="Christmas is coming, are you ready?"
            description="No need to stress, lets create a list to help us with our Christmas shopping!"
            icon="fas fa-gift"
            v-on:perform="createList('Christmas shopping', 'Lets spread the Christmas cheer by remembering to get everybody a gift this year!', 'https://shinestorage.azureedge.net/bespokebackgrounds/christmas.jpg')"
          />
          <list-suggestion
            title="Need to organise your day tomorrow?"
            description="We like your thinking, we can create a list to help you succeed tomorrow."
            icon="fas fa-calendar"
            v-on:perform="createList(tomorrowsDate, 'Failing to plan is planning to fail, so today we are going to do things the right way', 'https://shinestorage.azureedge.net/bespokebackgrounds/tomorrow.jpg')"
          />
          <list-suggestion
            title="Sorting out some odd jobs?"
            description="Nobody likes chores, but the sooner you get them done, the better."
            icon="fas fa-bolt"
            v-on:perform="createList('Odd jobs', 'These things have been building up, its time to smash them', 'https://shinestorage.azureedge.net/bespokebackgrounds/jobs.jpg')"
          />
        </div>
      </div>
    </profile-cover>
  </div>
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
  data: function() {
    return {
      isSubmitting: false
    };
  },
  created: function() {
    var isWelcome = this.$route.query.welcome;

    if (isWelcome) {
      this.createWelcomeExperience();
    }
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
    },
    welcomeMessage: function() {
      if (!this.userProfile) {
        return "Loading your Profile...";
      } else {
        return `Hi ${this.userProfile.givenName}`;
      }
    },
    tomorrowsDate: function() {
      var today = new Date();
      var dd = today.getDate() + 1;
      var mm = today.getMonth() + 1;

      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "/" + mm + "/" + yyyy;
    }
  },
  methods: {
    createList: function(title, description, image) {
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
    loadProfile: function() {
      let userProfile = this.$store.getters.userProfile;

      if (userProfile === null) {
        this.$http.get(`/userprofiles/me`).then(response => {
          this.$store.commit("setUserProfile", response.data);
        });
      }
    },
    createWelcomeExperience: function() {
      this.$http.post(`/lists/welcome`, {}).then(listResponse => {
        this.$http.post(`/lists/${listResponse.data}/welcome`).then(() => {
          this.userProfile.profilePicturePath = "";
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