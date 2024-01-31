<template>
	<section class="brush__container">
		<form class="brush-item ">
			<div >
				<label>
					{{ $t('product.titles.productTitle') }}
				<input v-model.lazy="set.title"  type="text" >
				</label>
				<label>
					{{ $t('product.titles.productPrice') }}
				<input v-model="set.price"  type="number" >
				</label>
				<label>
					{{ $t('product.titles.productDescription') }}
					<input v-model="set.description"  type="text" >
				</label>
				<label>
					{{ $t('product.titles.productImage') }}
					<input v-model="set.url"  type="text" >
				</label>
				<v-btn class="button" @click="onAction">{{languageTitleChange}}</v-btn>
				<v-btn class="button" @click="onSetList">{{$t('button.productList')}}</v-btn>
			</div>
		</form>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
	export default {
		name:'ProCreateSetEditor',
		props: {
			setId: {
				type: [String, Number],
				required: true,
			},
		},
		data() {
			return {
				set: {},
			}
		},
		computed: {
			...mapGetters('procreateItems', ['getSetItemById']),

			actionButtonTitle(){
				return this.setId ? 'Save' : 'Create'
			},
			languageTitleChange(){
				let t
				if(this.actionButtonTitle === 'Save') t = this.$t('button.save')
				if(this.actionButtonTitle === 'Create') t = this.$t('button.create')
				return t
			}
		},
		created () {
			if(this.setId)
			this.set = {...this.getSetItemById(this.setId)}
		},
		methods: {
			...mapActions('procreateItems',['addSetItem', 'updateSetItem']),
			onAction(){
				if(!this.setId){
					if(this.set.title  && this.set.price && this.set.description && this.set.url)
						this.addSetItem(this.set)
						this.$router.push({
						name: 'pro-create-set'
					})
				}else{
					this.updateSetItem({
						itemId : this.set.id,
						data:{
							title: this.set.title,
							price: this.set.price,
							description: this.set.description,
							url: this.set.url
						}
					})
					this.$router.push({
						name: 'pro-create-set'
					})
				}
				
			},
			onSetList(){
				this.$router.push({
					name: 'pro-create-set'
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
.button {
	border: 2px solid rgba(113, 160, 121, 0.5);

}
</style>