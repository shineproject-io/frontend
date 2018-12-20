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
          <sidebar-link
            title="Create a free account"
            description="Get started with Shine"
            icon="fas fa-address-card"
            route="/welcome/register"
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
import sidebarLink from "@/navigator/sidebar-link.vue";
import CreatorLink from "@/navigator/creator-link.vue";
import profileLink from "@/features/profile/profile-link";
import listLinkWrapper from "@/features/lists/list-link-wrapper.vue";
import signOutLink from "@/navigator/sign-out-link";
import siteLink from "@/navigator/site-link";

export default {
  name: "sidebar",
  components: {
    sidebarLink,
    listLinkWrapper,
    siteLink,
    profileLink,
    CreatorLink,
    signOutLink
  },
  props: {
    isAnonymous: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      menuDismissed: true
    };
  },
  mounted: function() {
    this.$root.$on("show-menu", () => {
      this.menuDismissed = false;
    });
  },
  beforeDestroy: function() {
    this.$root.$off("show-menu");
  }
};
</script>

<style>
.sidebar {
  position: relative;
  width: 375px;
}

.sidebar-inner {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 375px;
  height: 100%;
  border-right: 1px solid #f2f2f2;
}

.footer-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #f2f2f2;
}

/* iPad Landscape */
@media (max-width: 1024px) {
  .sidebar {
    width: 300px;
    overflow: hidden;
  }

  .sidebar-inner {
    width: 300px;
  }
}

/* iPad Portrait */
@media (max-width: 768px) {
  .sidebar {
    position: fixed !important;
    z-index: 2002;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
  }

  .sidebar-inner {
    width: 100%;
  }

  .sidebar.dismissed {
    display: none;
  }
}

/* Sideways and very small phones */
@media (max-height: 412px) {
  .sidebar {
    position: relative;
  }

  .sidebar-inner {
    position: relative;
    height: auto;
  }
  .footer-bar {
    position: unset !important;
  }
}
</style>