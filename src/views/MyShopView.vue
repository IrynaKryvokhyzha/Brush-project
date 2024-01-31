<template>
<main-master-page>
	<my-shop-manager/>
</main-master-page>
</template>

<script>


import MyShopManager from '@/components/My Shop/MyShopManager.vue';
import MainMasterPage from '../masterpages/MainMasterPage.vue';
	export default {
    name: 'MyShopView',
    components: { MyShopManager, MainMasterPage },

}
</script>

<style lang="scss" scoped>

</style>