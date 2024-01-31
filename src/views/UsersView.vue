<template>
<main-master-page>
	{{ userPermissions }}
</main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue';
import { mapGetters, mapActions } from 'vuex';

	export default {
    name: 'UsersView',
    components: { MainMasterPage },
	 computed: {
		...mapGetters('users',['userPermissions'])
	 },
	 methods: {
		...mapActions('users',['loadUserPermissions'])
	 },
}
</script>

<style lang="scss" scoped>

</style>