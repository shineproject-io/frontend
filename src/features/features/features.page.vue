<template>
  <div class="text-center text-lg-left">
    <feature-header/>
    <feature-ideas/>
    <feature-devices/>
    <feature-customisation/>
    <feature-tracking/>
    <feature-footer/>
  </div>
</template>

<script>
import featureHeader from "@/features/features/feature-header";
import featureIdeas from "@/features/features/feature-ideas";
import featureDevices from "@/features/features/feature-devices";
import featureCustomisation from "@/features/features/feature-customisation";
import featureTracking from "@/features/features/feature-tracking";
import featureFooter from "@/features/features/feature-footer";

export default {
  components: {
    featureHeader,
    featureIdeas,
    featureDevices,
    featureCustomisation,
    featureTracking,
    featureFooter
  }
};
</script>

<style scoped lang="scss">
.desktop-50 {
  width: 50%;

  @media (max-width: $media-ipad-landscape) {
    width: 100%;
  }
}

.btn:hover {
  color: $inverted-text-colour;
  text-decoration: underline;
}
</style>