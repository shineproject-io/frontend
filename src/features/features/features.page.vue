<template>
  <div class="feature-page text-center text-lg-left">
    <feature-header/>
    <feature-ideas/>
    <feature-carousel/>
  </div>
</template>

<script>
import featureHeader from "@/features/features/feature-header";
import featureIdeas from "@/features/features/feature-ideas";
import featureCarousel from "@/features/features/feature-carousel";

export default {
  components: {
    featureHeader,
    featureIdeas,
    featureCarousel
  }
};
</script>

<style scoped lang="scss">
.btn:hover {
  color: $inverted-text-colour;
  text-decoration: underline;
}
</style>