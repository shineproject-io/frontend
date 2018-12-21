<template>
	<button class="btn btn-primary" v-bind:class="[{'btn-lg': isLarge}, {'no-events': isLoading}]">
		<i v-if="isLoading" class="fa fa-spinner fa-spin fa-fw mr-2"></i>
		<i v-if="!isLoading && icon.length > 0" class="fa fa-fw mr-2" v-bind:class="icon"></i>
		<span>{{text}}</span>
	</button>
</template>

<script>
export default {
	name: "loading-button",
	props: {
		text: {
			type: String,
			default: 'Submit',
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		isLarge: {
			type: Boolean,
			default: false
		},
		icon:{
			type: String,
			default: ''
		},
	},
};
</script>