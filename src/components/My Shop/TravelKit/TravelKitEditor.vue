<template>
		<section class="brush__container">
			<form class="brush-item ">
				<div >
					<label>
						{{ $t('product.titles.productTitle') }}
					<input v-model.lazy="kit.title"  type="text" >
					</label>
					<label>
						{{ $t('product.titles.productPrice') }}
					<input v-model="kit.price"  type="number" >
					</label>
					<label>
						{{ $t('product.titles.productDescription') }}
						<input v-model="kit.description"  type="text" >
					</label>
					<label>
						{{ $t('product.titles.productImage') }}
						<input v-model="kit.url"  type="text" >
					</label>
					<v-btn class="button" @click="onAction">{{languageTitleChange}}</v-btn>
					<v-btn class="button" @click="onKitList">{{$t('button.productList')}}</v-btn>
				</div>
			</form>
		</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'TravelKitEditor',
		props: {
			kitId: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				kit: {}
			}
		},
		computed: {
			...mapGetters('travelItems', ['getKitItemById']),

			actionButtonTitle(){
				return this.kitId ? 'Save' : 'Create'
			},
			languageTitleChange(){
				let t
				if(this.actionButtonTitle === 'Save') t = this.$t('button.save')
				if(this.actionButtonTitle === 'Create') t = this.$t('button.create')
				return t
			}
		},
		created () {
			if(this.kitId)
			this.kit = {...this.getKitItemById(this.kitId)}
		},
		methods: {
			...mapActions('travelItems',['addItem', 'updateItem']),
			onAction(){
				if(!this.kitId){
					if(this.kit.title  && this.kit.price && this.kit.description && this.kit.url)
						this.addItem(this.kit)
						this.$router.push({
						name: 'travel-kit'
					})
				}else{
					this.updateItem({
						itemId : this.kit.id,
						data:{
							title: this.kit.title,
							price: this.kit.price,
							description: this.kit.description,
							url: this.kit.url
						}
					})
					this.$router.push({
						name: 'travel-kit'
					})
				}
				
			},
			onKitList(){
				this.$router.push({
					name: 'travel-kit'
				})
			}, 
		},
	}
</script>

<style lang="scss" scoped>
h3{
	font-size: 24px;
	padding-bottom: 40px;
}
input{
	border: 1px solid #6b6a6a;
	border-radius: 5px;
}
</style>