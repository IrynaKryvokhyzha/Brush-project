<template>
	<div>
		<div class="shop-manager__container">
			<div v-for="item in getShopList" :key="item.id" class="shop-manager__item item">
				<img class="item__image"  @click="onClick(item.title)" :src="item.url" alt="brush image">
				<h2 class="item__title">{{item.title}}</h2>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';

	export default {
		name:'MyShopManager',
	
		computed: {
			...mapGetters('shopList', ['getShopList'])
		},
		created () {
			 this.loadShopList();
		},
		methods: {
			...mapActions('shopList', ['loadShopList']),
			onClick(title){
				if(title==='Procreate Set')
				this.$router.push({
					name: 'pro-create-set'
				})
				else if(title==='Premium Brushes')
				this.$router.push({
					name: 'individual-brushes'
				})
				else if(title==='Travel Kit')
				this.$router.push({
					name: 'travel-kit'
				})
				else{
					this.$router.push({
					name: 'error'
				})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.shop-manager {

	&__container {
		display: grid;
		grid-template-columns: repeat(3,1fr);
		justify-content: center;
		gap: 20px;

		@media (max-width: 1320px) {
			grid-template-columns: repeat(2,1fr);
		}
		@media (max-width: 991px) {
			margin-top: -20px;
			row-gap: 5px;
		}
		@media (max-width: 876px) {
			grid-template-columns: auto;
		}
		@media (max-width: 767.98px){
			margin-top: -50px;
		} 
		
		
	}
	&__item {
		margin-top: 20px;
	
	}
}
.item {
	
	transition: transform 0.3s;

	@media (any-hover: hover){
		&:hover{
			transform: scale(1.05);
		}
	}
	&__image {
		img{
			width: 100%;
		}

		
	}

	&__title {
		text-transform: uppercase;


	}
}

</style>