<template>
	<div class="error__container">
		<h2 >Oops! Something went wrong!</h2>
		<font-awesome-icon :icon="['fas', 'bug']" class="icon" />
		<v-btn class="button" @click="onClick">Home</v-btn>
	</div>
</template>

<script>
	export default {
		name: 'ErrorPage',
		methods: {
			onClick() {
				this.$router.push({
					name: 'home'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.error {

	// .error__container

	&__container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 50px;
		gap: 30px;
	}
}
h2{
	align-self: center;
}
.icon {
	color:  rgb(80, 136, 91);
	font-size: 58px;
}
.button {
	width: 200px;
	align-self: center;
}

</style>