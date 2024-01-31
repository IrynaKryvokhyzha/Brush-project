<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer-page">
				<div class="footer-top">
					<div class="footer-top__customer-care">
						<button class="footer-top__item" @click="onAccount">{{$t('footer.myAccount')}}</button>
						<button class="footer-top__item" @click="onAccount">{{$t('footer.myOrder')}}</button>
						<button class="footer-top__item" @click="onContact">{{$t('footer.contactUs.contactUs')}}</button>
						<button @click="onPrecautions" class="footer-top__item">{{$t('footer.brushPrecautions')}}</button>
					</div>
					<div class="footer-top__shipping">
						<button @click="onReturn" class="footer-top__item">{{$t('footer.return')}}</button>
						<!-- доробити кліки + сторінки-->
						<button class="footer-top__item">{{$t('footer.shipping')}}</button>
					</div>
					<div class="footer-top__legal-area">
						<button class="footer-top__item">{{$t('footer.privacypolicy')}}</button>
						<button class="footer-top__item">{{$t('footer.termsOfService')}}</button>
						<button class="footer-top__item">{{$t('footer.cookiePolicy')}}</button>
					</div>
					<div class="footer-top__connect">
						<a href="https://www.instagram.com" class="insta">
							<font-awesome-icon :icon="['fab', 'instagram']" />
						</a>
					</div>
				</div>
				<!-- доробити -->
				<!-- <div class="footer-bottom">
					<span>X</span>
					<span>X</span>
					<span>X</span>
					<span>X</span>
					<span>X</span>
					<span>X</span>
					<span>X</span>
					<span>X</span>
				</div> -->
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name:"FooterComponent",

		methods: {
			onAccount(){
				this.$router.push({
					name:'my-account'
				})
			},
			onContact(){
				this.$router.push({
					name:'contact-us'
				})
			},
			onPrecautions(){
			this.$router.push({
				name:'brush-precautions'
			})
		  },
		  onReturn(){
			this.$router.push({
				name:'return-policy'
			})
		  },

		},

	}
</script>

<style lang="scss" scoped>

</style>