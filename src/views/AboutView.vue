<template>
	<div>
		<main-master-page>
			<div class="about__container">
				<div class="about-us">
					<h1>{{ $t('aboutUs.title1') }}</h1>
					<img class="image" src="../images/photo/photo1.webp" alt="photo">
					<div class="about-us__paragraphs">
						<p>{{ $t('aboutUs.paragraph1') }}</p>
						<p>{{ $t('aboutUs.paragraph2') }}</p>
						<p>{{ $t('aboutUs.paragraph3') }}</p>
						<p>{{ $t('aboutUs.paragraph4') }}</p>
						<p>{{ $t('aboutUs.paragraph5') }}</p>
						<p>{{ $t('aboutUs.paragraph6') }}</p>
						<p>{{ $t('aboutUs.paragraph7') }}</p>
					</div>
					<h2>{{ $t('aboutUs.title2') }}</h2>
					<img class="image" src="../images/photo/photo2.webp" alt="photo">
					<p class="about-us__paragraphs">{{ $t('aboutUs.paragraph8') }} </p>
				</div>
			</div>
		</main-master-page>
	</div>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue';
	export default {
		name: 'AboutView',
		components: {
			MainMasterPage,
		},
	}
</script>

<style lang="scss" scoped>

.about {

	// .about__container

	&__container {
		padding-top: 70px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;

		@media (max-width: 767.98px) {
		padding-top: 0;


		}
	}
}
.about-us {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 40px;
	max-width: 600px;

	@media (max-width: 500px) {
		max-width: 400px;

	}
	// .about-us__paragraphs

	&__paragraphs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		gap: 20px;
		line-height: 1.8;
	}
}
.image {
	@media (max-width: 500px) {
		width: 80%;
	}
	img{
	width: 100%;

	}
}
h1{
	font-size: 42px;
	@media (max-width: 500px) {
		font-size: 32px;
	}
	@media (max-width: 379px) {
		font-size: 28px;
	}
}
h2{
	font-size: 28px;
	font-weight: 600;
}
</style>


