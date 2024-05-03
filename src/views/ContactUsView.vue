<template>
	<div>
<MainMasterPage>
	<div class="contacts__container">
		<div class="contacts-page">
			<h1>{{$t('menu.contact-us')}}</h1>
				<p>{{$t('footer.contactUs.paragraph1')}}</p>
				<p>{{$t('footer.contactUs.paragraph2')}}</p>
				<div class="email-form">
					<div class="email-form__top">
						<label >
							{{$t('footer.name')}}
							<input type="text" :placeholder="$t('footer.name')">
						</label>
						<label >
							{{$t('footer.email')}}
							<input type="email" :placeholder="$t('footer.email')">
						</label>
					</div>
					<div class="email-form__bottom">
						<label >
							{{$t('footer.message')}}
							<textarea   rows="10" :placeholder="$t('footer.message')"></textarea>
						</label>
					</div>

				</div>
				<button class="rounded-button">{{$t('button.submit')}}</button>
			</div>
		</div>
</MainMasterPage>
	</div>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue';

	export default {
    name: 'ContactUsView',
    components: { MainMasterPage }
}
</script>

<style lang="scss" scoped>

.contacts {


	// .contacts__container

	&__container {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	

			}
}
.contacts-page{
	align-items: center;
	width: 600px;
	padding: 30px 10px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	@media (max-width: 700px) {
		width: 500px;

		gap: 10px;
	}
	@media (max-width: 580px) {
		width: 400px;

	}
	@media (max-width: 460px) {
		width: 280px;

	}
}
.email-form {
display: flex;
flex-direction: column;
width: 100%;
	// .email-form__top

	&__top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
	}
	// .email-form__bottom

	&__bottom {
	}
}


h1{
	text-transform: uppercase;
	font-size: 32px;
	font-weight: 500;
	align-self: start;
	&:not(:last-child){
		//margin-bottom: 20px;
	}
}
input,
textarea{
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: flex;
	border: 1px solid #6b6a6a;
	border-radius: 5px;
	box-sizing: border-box;

}
.rounded-button{
align-self: start;
}
textarea{
	border: 1px solid #6b6a6a;

}
</style>