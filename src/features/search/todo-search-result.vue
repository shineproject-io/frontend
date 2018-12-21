<template>
	<transition name="fade">
		<router-link :to="navigationLink" class="search-result d-flex align-items-center cursor-pointer">
			<div class="pl-3 py-1">
				<i class="fas fa-tasks fa-fw mr-2"></i>
			</div>
			<p class="m-0 p-2 flex-grow-1">{{result.resultDescription}}</p>
			<div class="px-3 py-1">
				<i class="fas fa-chevron-right fa-fw mr-2 px-3 py-1"></i>
			</div>
		</router-link>
\	</transition>
</template>

<script>
export default {
	name: 'todo-search-result',
	components: {},
	props: {
		result: {
			type: Object,
			required: true,
		},
	},
	computed: {
		navigationLink() {
			return `/secure/list?listId=${this.result.listId}&todoItemId=${this.result.todoItemId}`;
		},
	},
}
</script>

<style scoped>
a {
	color: Black !important;
}
</style>