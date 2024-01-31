<template>
	
		<section class="brush__container">
			<form class="brush-item ">
				<div >
					<label>
						{{ $t('product.titles.productTitle') }}
					<input v-model.lazy="brush.title"  type="text" >
					</label>
					<label>
						{{ $t('product.titles.productPrice') }}
					<input v-model="brush.price"  type="number" >
					</label>
					<label>
						{{ $t('product.titles.productDescription') }}
						<input v-model="brush.description"  type="text" >
					</label>
					<label>
						{{ $t('product.titles.productType') }}
						<input v-model="brush.type"  type="text" >
					</label>
					<label>
						{{ $t('product.titles.productImage') }}
						<input v-model="brush.url"  type="text" >
					</label>
					<v-btn class="button" @click="onAction">{{languageTitleChange}}</v-btn>
					<v-btn class="button" @click="onBrushList">{{$t('button.productList')}}</v-btn>
				</div>
			</form>
		</section>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

	export default {
		name:'BrushEditor',

		data() {
			return {
				brush: {},
			}
		},
		computed: {
			...mapGetters('brushItems', ['getBrushById']),
			...mapGetters('users',['userPermissions']),
			receiveBrushId(){
				return this.$route.params.brushId
			},
			actionButtonTitle(){
				return this.receiveBrushId ? 'Save' : 'Create'
			},
			languageTitleChange(){
				let t
				if(this.actionButtonTitle === 'Save') t = this.$t('button.save')
				if(this.actionButtonTitle === 'Create') t = this.$t('button.create')
				return t
			}
		},
		created () {
			if(this.receiveBrushId)
			this.brush = {...this.getBrushById(this.receiveBrushId)}
		},
		methods: {
			...mapActions('brushItems',['addItem', 'updateItem']),
			onAction(){
				if(!this.receiveBrushId){
					if(this.brush.title  && this.brush.price && this.brush.description && this.brush.type && this.brush.url)
						this.addItem(this.brush)
						this.$router.push({
						name: 'individual-brushes'
					})
				}else{
					this.updateItem({
						itemId : this.brush.id,
						data:{
							title: this.brush.title,
							price: this.brush.price,
							description: this.brush.description,
							type: this.brush.type,
							url: this.brush.url
						}
					})
					this.$router.push({
						name: 'individual-brushes'
					})
				}
				
			},
			onBrushList(){
				this.$router.push({
					name: 'individual-brushes'
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