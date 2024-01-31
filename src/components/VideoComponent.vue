<template>
	<div class="video-component">
		<div class="video-item">
			<video class="video-player" ref="video" autoplay loop muted>
				<source src="../video/videoDR.mp4" type="video/mp4">
			</video>
			<div class="video__cont">
				<div class="video">
					<h1 class="video__header">{{$t('video.videoHeader')}} </h1>
					<h3 class="video__subheader">{{$t('video.videoSubheader')}}</h3>
					<button class="rounded-button" @click="onShop">{{$t('button.shopNow')}}</button>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name:'VideoComponent',
		computed: {
			videoElement () {
				return this.$refs.video;
			}, 
		},
		methods: {
			onShop() {
				this.$router.push({
					name: 'my-shop'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>


.video-item{
	height: 800px;
	width: 100%;
	z-index: 1;
	flex-grow: 1;
	@media (max-width: 991px) {
		height: 650px;
		//margin-top: -50px;
	}
	@media (max-width: 767.98px){
		height: 500px;
	} 

}

.video-player{


	top: 0;
	object-fit: cover;
	width: 100%;
	height: 800px;
	align-items: start;
	@media (max-width: 991px) {
		height: 650px;
		margin-top: -50px;
	}
	@media (max-width: 767.98px){
		height: 500px;
	} 
}

.video {

	// .video__container

	&__cont {
		position: relative;
		color: rgb(234, 238, 226);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		

	}
}

.video {
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	align-items: center;


	@media (max-width: 606px) {
		gap: 10px;
	}


	// .video__header

	&__header {
		margin-top: -100%;
		font-size: 56px;
		font-weight: 400;
		text-transform: uppercase;
		text-align: center;
		line-height: 1.3;

		@media (max-width: 1035px) {
			font-size: 48px;
			margin-top: -115%;
		}
		@media (max-width: 991px) {
			font-size: 40px;
			
		}
		@media (max-width: 767.98px) {
			font-size: 32px;
			margin-top: -60%;
		}
		@media (max-width: 606px) {
			font-size: 36px;
		}
		@media (max-width: 424px) {
			margin-top: -260px;
		}
		@media (max-width: 278px) {
			margin-top: -300px;
		}
	}

	// .video__subheader

	&__subheader {
		font-size: 18px;
		&:not(:last-child){
			margin-bottom: 40px;
			@media (max-width: 767.98px) {
				margin-bottom: 20px;
			}
		}
	}

	// .video__button

	&__button {
		border: 2px solid white;
		padding: 20px 50px;
		border-radius: 30px;
		text-transform: uppercase;
		transition: all 0.3s;
		@media (any-hover: hover){
			&:hover{
				background-color: #fff;
				color: #000;
			}
		}
	}
}
.rounded-button{
	border: 2px solid white;
}
</style>