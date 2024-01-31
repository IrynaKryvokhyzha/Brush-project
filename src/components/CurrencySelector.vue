<template>
	<div>
		<select name="currency" v-model="currentCurrency">
			<option  v-for="currency in getCurrencyRateList" :key="currency.id" :value="currency.rate" selected>{{currency.title}}</option>
		</select>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
	export default {
		name:'CurrencySelector',

		computed: {
			...mapGetters('currencyList',['getCurrencyRateList', 'getCurrencyRate']),

			currentCurrency:{
				get(){
					return this.getCurrencyRate
				},
				set(val){
					this.updateCurrencyRate(val)
				}
			}
		},
		created () {
			this.loadCurrencyRateList()
		},
		methods: {
			...mapActions('currencyList',['loadCurrencyRateList', 'updateCurrencyRate']),


		},
	}
</script>

<style lang="scss" scoped>
select{
	border: 2px solid white;
	padding: 5px;
	border-radius: 5px;
	text-align: center;
	color: white;
	background-color: rgb(105, 134, 111);
}

</style>