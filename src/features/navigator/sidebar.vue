<template>
  <div class="sidebar bg-white" v-bind:class="{ 'dismissed': menuDismissed }">
    <div class="sidebar-inner">
      <site-link class="link-border" v-on:dismiss-menu="menuDismissed = true"/>
      <div v-on:click="menuDismissed = true">
        <div v-if="isAnonymous">
          <sidebar-link
            title="Welcome to Shine"
            description="Check out the features"
            icon="fas fa-star"
            route="/welcome/features"
          />
          <sidebar-link
            title="Create a free account"
            description="Get started with Shine"
            icon="fas fa-address-card"
            route="/welcome/register"
          />
          <sidebar-link
            title="Sign in"
            description="Time to get stuff done"
            icon="fas fa-sign-in-alt"
            route="/welcome/signin"
          />
          <sidebar-link
            title="Reset Password"
            description="Lets reset your password"
            icon="fas fa-key"
            route="/welcome/forgottenpassword"
          />
          <div class="footer-bar">
            <creator-link/>
          </div>
        </div>

        <div v-else>
          <profile-link class="link-border"/>
          <sidebar-link
            title="Search"
            description="Find a list or to-do"
            icon="fas fa-search"
            route="/secure/search"
          />
          <list-link-wrapper/>
          <div class="footer-bar">
            <sign-out-link/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarLink from "@/features/navigator/sidebar-link.vue";
import creatorLink from "@/features/navigator/creator-link.vue";
import profileLink from "@/features/profile/profile-link";
import listLinkWrapper from "@/features/lists/list-link-wrapper.vue";
import signOutLink from "@/features/navigator/sign-out-link";
import siteLink from "@/features/navigator/site-link";
import { mapGetters } from "vuex";

export default {
  name: "sidebar",
  components: {
    sidebarLink,
    listLinkWrapper,
    siteLink,
    profileLink,
    creatorLink,
    signOutLink
  },
  data() {
    return {
      menuDismissed: true
    };
  },
  computed: {
    ...mapGetters("authenticationModule", ["isAnonymous"])
  },
  mounted() {
    this.$root.$on("show-menu", () => {
      this.menuDismissed = false;
    });

    this.$root.$on("hide-menu", () => {
      this.menuDismissed = true;
    });
  },
  beforeDestroy() {
    this.$root.$off("show-menu");
    this.$root.$off("hide-menu");
  }
};
</script>

<style lang="scss">
.sidebar {
  position: relative;
  width: 375px;

  @media (max-width: $media-ipad-landscape) {
    width: 300px;
    overflow: hidden;
  }

  @media (max-width: $media-ipad-portrait) {
    position: fixed !important;
    z-index: 2002;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  @media (max-height: $media-phone-landscape) {
    position: relative;
  }
}

.sidebar-inner {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 375px;
  height: 100%;
  border-right: 1px solid #f2f2f2;

  @media (max-width: $media-ipad-landscape) {
    width: 300px;
  }

  @media (max-width: $media-ipad-portrait) {
    width: 100%;
  }

  @media (max-height: $media-phone-landscape) {
    position: relative;
    height: auto;
  }
}

.sidebar.dismissed {
  @media (max-width: $media-ipad-portrait) {
    display: none;
  }
}

.footer-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #f2f2f2;

  @media (max-height: $media-phone-landscape) {
    position: unset !important;
  }
}
</style>