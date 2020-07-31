<template>
  <div>
    <sidebar/>

    <div id="route-page">
      <menu-activator/>
      <router-view class="animated fadeIn animate-fast"/>
    </div>

    <add-list v-if="!isAnonymous"/>
  </div>
</template>

<script>
import "@/common/product-branding.scss";
import sidebar from "@/features/navigator/sidebar.vue";
import menuActivator from "@/features/navigator/menu-activator.vue";
import addList from "@/features/lists/add-list";
import '@tomorepo/overlay/dist/overlay.css';
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    sidebar,
    addList,
    menuActivator
  },
  computed: {
    ...mapState("authenticationModule", ["authenticationToken"]),
    ...mapGetters("authenticationModule", ["isAnonymous"])
  },
  watch: {
    "$route.name"() {
      this.initialiseAuthentication();
    }
  },
  mounted() {
    this.initialiseAuthentication();
  },
  methods: {
    initialiseAuthentication() {
      let currentRoute = this.$route.path.toLowerCase();

      // Vue-Router will automatically re-route
      if (currentRoute === "/") {
        return;
      }

      if (!currentRoute.includes("welcome") && !this.authenticationToken) {
        this.$router.push({ name: "sign-in" });
      } else if (currentRoute.includes("welcome") && this.authenticationToken) {
        this.$router.push({ name: "profile" });
      }
    }
  }
};
</script>

<style lang="scss">
#route-page {
  float: right;
  width: calc(100% - 375px);

  @media (max-width: $media-ipad-landscape) {
    width: calc(100% - 300px);
  }

  @media (max-width: $media-ipad-portrait) {
    width: 100%;
  }
}
</style>