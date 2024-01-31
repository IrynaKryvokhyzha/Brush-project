<template>
	<section class="gentle-touch">
		<div class="gentle-touch__item item">
			<div class="item__content content">
				<h2 class="content__header">{{$t('gentleTouch.title1')}}</h2>
				<button class="content__button rounded-button" @click="onShop">{{$t('button.shopNow')}}</button>
			</div>
			<div class="item__image">
				<img src="../images/brushes/brushes1.webp" alt="brushes image">
			</div>
		</div>
		<div class="gentle-touch__item item">
			<div class="item__image">
				<img src="../images/brushes/brushes3.webp" alt="brushes image">
			</div>
			<div class="item__content content">
				<h2 class="content__header">{{$t('gentleTouch.title2')}}</h2>
				<button class="content__button rounded-button" @click="onShop">{{$t('button.shopNow')}}</button>
			</div>
			
		</div>

	</section>
</template>

<script>
	export default {
		name:'GentleTouch',
		methods: {
			onShop() {
				this.$router.push({
					name:'my-shop'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.gentle-touch {




	// .gentle-touch__item

	&__item {



	}
}
.item {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	height: 500px;
	@media (max-width: 850px) {
		height: 400px;
	}
	@media (max-width: 767.98px) {
		flex-direction: column;
		height: 800px;
		padding: 10px 0;
	}

	// .item__content

	&__content {
		flex: 1;
		background-color: rgb(105, 134, 111);
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 30px;
		max-height: 600px;
		
	}

	// .item__image

	&__image {
		flex: 1;
		
		position: relative;
		
		img{
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			object-fit: cover;
			max-height: 100%;
			

		}
	}
}
.content {

	// .content__header

	&__header {
		font-size: 28px;
		padding: 0px 20px;
		text-align: center;
		line-height: 2;
		@media (max-width: 850px) {
			font-size: 24px;
			line-height: 1.5;

		}
	}

	// .content__button

	&__button {
	}
}

.rounded-button {
	background-color: transparent;
	border: 2px solid white;
	@media (any-hover: hover){
		&:hover{
			background-color: #fff;
		}
	}
}

</style>