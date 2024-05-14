<template>
	<router-view />
</template>
<script>
</script>
<style lang="scss">
@import './assets/styles';

nav {
	padding: 30px;
 
	a {
	 &.router-link-exact-active {
		 color: white;
		 @media (max-width: 767.98px) {
			color: rgb(157, 147, 147);
		}
	  }
 
	 
	}
}
</style>
