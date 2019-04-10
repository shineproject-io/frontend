<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
	name: "overlay",
}
</script>

<style scoped lang="scss">
.overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1030;
	background: rgba(0, 0, 0, 0.6);

	@media (max-width: $media-ipad-portrait) {
		padding-left: 5px;	
		padding-right: 5px;
}
}

</style>
