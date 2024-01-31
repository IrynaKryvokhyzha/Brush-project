<template>
	<main-master-page>
		<div class="precautions__container">
			<div class="precautions-page">
				<h1>{{ $t('precautions.warning') }}:</h1>
				<p>{{ $t('precautions.paragraph1') }}</p>
				<p>{{ $t('precautions.paragraph2') }}</p>
				<p>{{ $t('precautions.paragraph3') }}</p>
			</div>
		</div>
	</main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
	export default {
		name:'BrushPrecautions',
		components: { MainMasterPage },

	}
</script>

<style lang="scss" scoped>
.precautions {

	// .precautions__container

	&__container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 200px;
	}
}
.precautions-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
	max-width: 600px;
	line-height: 1.6;
	padding-top: 30px;
	@media (max-width: 991px) {
		margin-top: -25px;
	}
	@media (max-width: 767.98px) {
		margin-top: -50px;
		max-width: 450px;
	}
	@media (max-width: 550px) {
		gap: 5px;
		max-width: 250px;
	}
}

</style>