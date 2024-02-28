<template>
	<div >

		<router-view />
	</div>
 
 
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
	  }
 
	 
	}
}
</style>
