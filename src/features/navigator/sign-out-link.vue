<template>
  <a
    href="#"
    v-on:click.prevent="signOut"
    class="sign-out-link px-3 py-2 d-flex align-items-center"
  >
    <i class="menu-item-icon fas fa-sign-out-alt fa-fw mr-3"/>
    <div class="flex-grow-1">
      <p class="mb-0">Sign out</p>
    </div>
  </a>
</template>

<script>
export default {
  name: "site-link",
  methods: {
    signOut() {
      this.$store.dispatch("authenticationModule/signOut");
      this.$store.dispatch("listsModule/signOut");
      this.$store.dispatch("todoModule/signOut");
      this.$store.dispatch("profileModule/signOut");
      this.$store.dispatch("suggestionsModule/signOut");
      this.$router.push({ name: "features" });
    }
  }
};
</script>

<style lang="scss">
.sign-out-link {
  border-top: 1px solid $primary-border-colour;
  transition: all 0.1s ease-in-out;
  height: 62px;
  background-color: $primary-background-highlight-colour;

  &:hover {
    background-color: $brand-primary-colour !important;
    color: $inverted-text-colour !important;
  }
}
</style>