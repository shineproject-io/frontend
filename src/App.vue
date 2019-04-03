<template>
  <loading-container :is-loading="isLoading">
    <sidebar/>

    <div id="route-page">
      <menu-activator/>
      <router-view class="animated fadeIn animate-fast"/>
    </div>

    <add-list v-if="!isAnonymous"/>
  </loading-container>
</template>

<script>
import "@/common/product-branding.css";
import sidebar from "@/navigator/sidebar.vue";
import menuActivator from "@/navigator/menu-activator.vue";
import addList from "@/features/lists/add-list";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    sidebar,
    addList,
    menuActivator
  },
  data() {
    return {
      isLoading: true
    };
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
      this.isLoading = true;
      let currentRoute = this.$route.path.toLowerCase();

      // Vue-Router will automatically re-route
      if (currentRoute === "/") {
        return;
      }

      if (!currentRoute.includes("welcome") && !this.authenticationToken) {
        this.$router.push({ name: "sign-in" });
      } else if (currentRoute.includes("welcome") && this.authenticationToken) {
        this.$router.push({ name: "profile" });
      } else {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
#route-page {
  float: right;
  width: calc(100% - 375px);
}

/* iPad Landscape */
@media (max-width: 1024px) {
  #route-page {
    width: calc(100% - 300px);
  }
}

/* iPad Portrait */
@media (max-width: 768px) {
  #route-page {
    width: 100%;
  }
}
</style>