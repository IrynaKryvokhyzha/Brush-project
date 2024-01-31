<template>
	<div class="filter__container">
		<div class="search-top">
			<div>
				<label class="close-filter" @click="closeFilter"><font-awesome-icon :icon="['fas', 'arrow-right']" /></label>
			</div>
			<div>
				<label >
					<input v-model="search" placeholder="Search" class="search-input">
				</label>
			</div>
		</div>

		<article class="brush-filter">
			<div v-for="item in searchResult" :key="item.id" class="brush__item">
				<v-card class="mx-auto" max-width="350">
					<v-img class="img" :src="item.url" height="250px"	cover ></v-img>

					<v-card-title class="title"> {{item.title}}</v-card-title>
					
					<v-card-subtitle>	{{getCurrentPrice(item.price)}} {{ getCurrencyTitle }} </v-card-subtitle>

					<v-card-actions class="add-to-cart-button">
						<div>
							<v-btn color="light-green-darken-3"	variant="text"> {{ $t('button.addToCart') }}	</v-btn>
						</div>
					
							<v-spacer></v-spacer>
					</v-card-actions>
					<v-expand-transition>
						<v-card v-if="item.reveal" class="transition-fast-in-fast-out vf-card--reveal" style="height: 100%;">
							<v-card-text class="pb-0" style="max-height: 300px; overflow-y: auto;">
								<p class="text-h4 text--primary">
									{{ $t('brushes.titles.description') }}
								</p>
								<p>{{item.description}}</p>
							</v-card-text>
							<v-card-actions class="pt-0">
								<v-btn	text 	color="teal accent-4"  @click="item.reveal = false">{{ $t('button.close') }}
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-expand-transition>
				</v-card>
			</div>
		</article> 
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

	export default {
		name:'BrushFilter',
		data() {
			return {
				filterObj: {},
				search: '',
				message: 'No results found'
			}
		},
		props: {
			title: {
				type: String,
			},
		},
		computed: {
			...mapGetters('brushItems',['getBrushList']),
			...mapGetters('procreateItems',['getSetItemsList']),
			...mapGetters('travelItems',['getTravelKitItemsList']),
			...mapGetters('currencyList',['getCurrencyTitle', 'getCurrentPrice']),
			
			searchResult(){
				if(this.search){
					return [...this.getFilteredBrushList(), ...this.getFilteredSetList(), ...this.getFilteredTravelKitList()];
				}else{
					return [...this.getBrushList, ...this.getSetItemsList, ...this.getTravelKitItemsList]
				}
			},
		},
		created () {
			this.loadBrushList()
			this.loadSetList()
			this.loadTravelKitList()
		},
		methods: {
			...mapActions('brushItems',['loadBrushList']),
			...mapActions('procreateItems',['loadSetList']),
			...mapActions('travelItems',['loadTravelKitList']),
			getFilteredBrushList(){
				return this.getBrushList.filter(item => 
						(item.title.toLowerCase().includes(this.search.toLowerCase()))
				)
			},
			getFilteredSetList(){
				return this.getSetItemsList.filter(item => 
						(item.title.toLowerCase().includes(this.search.toLowerCase()))
				)
			},
			getFilteredTravelKitList(){
				return this.getTravelKitItemsList.filter(item => 
						(item.title.toLowerCase().includes(this.search.toLowerCase()))
				)
			},
			closeFilter(){
			this.$emit('close-filter')
		},
		},
	}
</script>

<style lang="scss" scoped>
.filter {

	// .filter__container

	&__container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		right: 0;

	}
}
.search-top{
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
}
.close-filter {
	//position: fixed;
	display: block;
}
.brush-filter{
	display: flex;
	flex-direction: column;
	gap: 20px;
	
}
input{
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: flex;
	border: 1px solid #6b6a6a;
	border-radius: 5px;
	box-sizing: border-box;
	font-size: 24px;

}
.brush {

	// .brush__item

	&__item {
	
	}
}

.brush-filter {

}
.brush {

		// .brush__item

		&__item {
		}
}
.mx-auto {
	
}
.img {
}
.title {
}
.add-to-cart-button {
}

</style>