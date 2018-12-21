<template>
  <transition name="fade">
    <div class="search-result d-flex align-items-center no-select">
      <div class="pl-3 py-2">
        <i class="fas fa-info-circle fa-fw mr-2"></i>
      </div>
      <p class="m-0 p-2 flex-grow-1">Sorry, we can't find anything that matches your search</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "no-results"
};
</script>