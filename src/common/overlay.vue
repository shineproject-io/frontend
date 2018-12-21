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

<style scoped>
.overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1030;
	background: rgba(0, 0, 0, 0.6);
}

/* iPad Portrait */
@media (max-width: 767px) {
	.overlay {
		padding-left: 5px !important;	
		padding-right: 5px !important;
	}
}
</style>
