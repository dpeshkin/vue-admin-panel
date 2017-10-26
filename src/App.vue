<template lang='pug'>
#app
	.header
		app-header
	.tabs
		app-nav
	.content
		router-view
</template>

<script>
export default {
	components: {
		appHeader: require('./components/Header'),
		appNav: require('./components/Nav')
	}
};
</script>

<style lang="scss">

</style>
