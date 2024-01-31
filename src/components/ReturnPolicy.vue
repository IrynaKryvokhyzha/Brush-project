<template>
	<main-master-page>
		<div class="return__container">
			<div class="return-policy">
				<h1>{{$t('return.title')}}</h1>
				<p>{{$t('return.paragraph1')}}</p>
				<ol>
					<li>1. {{$t('return.eligibility.eligibilityForReturns')}}</li>
						<ul>
							<li>a. {{$t('return.eligibility.a')}}</li>
							<li>b. {{$t('return.eligibility.b')}}</li>
							<li>c. {{$t('return.eligibility.c')}}</li>
						</ul>
					<li>2. {{$t('return.return.returnProcess')}}</li>
					<ul>
						<li>a. {{$t('return.return.a')}}</li>
						<li>b. {{$t('return.return.b')}}</li>
						<li>c. {{$t('return.return.c')}}.</li>
					</ul>
					<li>3. {{$t('return.refund.refundOptions')}}</li>
					<ul>
						<li>a. {{$t('return.refund.a')}}</li>
						<li>b. {{$t('return.refund.b')}}</li>
						<li>c. {{$t('return.refund.c')}}</li>
					</ul>
					<li>4. {{$t('return.exchange.exchanges')}}</li>
					<ul>
						<li>a. {{$t('return.exchange.a')}}</li>
						<li>b.{{$t('return.exchange.b')}}</li>
					</ul>
					<li>5. {{$t('return.damaged.damagedOrDefectiveItems')}}</li>
					<ul>
						<li>a. {{$t('return.damaged.a')}}</li>
						<li>b. {{$t('return.damaged.b')}}.</li>
						<li>c. {{$t('return.damaged.c')}}</li>
					</ul>
					<li>6. {{$t('return.non-returnable.nonReturnableItems')}}</li>
					<ul>
						<li>a. {{$t('return.non-returnable.a')}}</li>
					</ul>
				</ol>
				
				<p>{{$t('return.paragraph2')}}</p>
				<p>{{$t('return.paragraph3')}}</p>
			</div>
		</div>

	</main-master-page>

</template>

<script>
import MainMasterPage from '../masterpages/MainMasterPage.vue'
	export default {
		name:'ReturnPolicy',
		components: { MainMasterPage },

	}
</script>

<style lang="scss" scoped>
.return {

	// .return__container

	&__container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 200px;
	}
}
.return-policy {
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
h1{
	font-size: 36px;
	text-align: center;
}
ol{
	padding-top: 10px;

	
}
li{
	padding-bottom: 5px;
}
ul{
	padding-bottom: 30px;
	padding-left: 15px;
}

</style>