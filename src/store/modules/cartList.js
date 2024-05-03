export default{
	namespaced: true,
	state: {
		cartList:[],
	},

	getters: {
		getCartList: (state) => state.cartList,
		getItemById: (state) => (itemId) => state.cartList.find((item) => item.id == itemId),

		getTotalPrice:(state) => state.cartList.reduce((prevSum, product)=> prevSum + product.price, 0),
		
	},

		mutations: {
		setItemsList(state, itemsList) {
			state.cartList = itemsList
		},

		addItemToCartList(state, itemId){
			const itemExists = state.cartList.find((item) => item.id == itemId)
			if(itemExists){
				itemExists.quantity += 1
				
			}else {
				const newItem = {
					id: itemId,
					quantity: 1

				}
			state.cartList.push(newItem)

			}
			
		},
		removeItemFromCartList(state, itemId){
			state.cartList = state.cartList.filter((item)=>item.id !==itemId)
		}
	},

	actions: {
		addItemToCart({commit}, itemId){
			commit('addItemToCartList', itemId)
		},
		rejectItem({commit}, itemId){
			commit('removeItemFromCartList', itemId)
		}
	},
}














// import DbOperations from '../helpers/DBOperations'
// const collectionDB = new DbOperations('cartList')
// export default {
// 	namespaced: true,
// 	state: () => ({
// 		cartList: [],
// 		loading: false,
// 		error: null,

		
// 	}),
// 	getters: {
// 		isLoading: (state) => state.loading,
// 		hasError: (state) => state.error,

// 		getCartList: (state) => state.cartList,
// 		getItemById: (state) => (itemId) => state.cartList.find((item) => item.id == itemId),

// 		getTotalPrice:(state) => state.cartList.reduce((prevSum, product)=> prevSum + product.price, 0),
// 	},
// 	mutations: {
// 		setItemsList(state, itemsList) {
// 			state.cartList = itemsList
// 		},

// 		setLoading(state, value) {
// 			state.loading = value
// 		},
// 		setError(state, error) {
// 			state.error = error
// 		},
// 		addItemToCartList(state, itemId){
// 			state.cartList.push(itemId)
// 		},
// 	},
// 	actions: {
// 		loadCartList({ commit }) {
// 			commit('setError', null)
// 			commit('setLoading', true)
// 			collectionDB
// 					.loadItemsList()
// 					.then((list) => {
// 						commit('setItemsList', list)
// 					})
// 					.catch((error) => {
// 						commit('setError', error)
// 					})
// 					.finally(() => {
// 						commit('setLoading', false)
// 					})
// 		},

// 		addItem({ commit, dispatch }, itemId) {
// 			commit('setError', null)
// 			commit('setLoading', true)
// 			collectionDB
// 					.addItem(itemId)
// 					.then(() => {
// 						dispatch('loadCartList')
// 					})
// 					.catch((error) => {
// 						commit('setError', error)
// 					})
// 					.finally(() => {
// 						commit('setLoading', false)
// 					})
// 		},
// 		deleteItem({ commit, dispatch }, itemId) {
// 			commit('setError', null)
// 			commit('setLoading', true)

// 			collectionDB
// 					.deleteItem(itemId)
// 					.then(() => {
// 						dispatch('loadCartList')
// 					})
// 					.catch((error) => {
// 						commit('setError', error)
// 					})
// 					.finally(() => {
// 						commit('setLoading', false)
// 					})
// 		},
// 		updateItem({ commit, dispatch }, { itemId, data }) {
// 			commit('setError', null)
// 			commit('setLoading', true)

// 			collectionDB
// 					.updateItem(itemId, data)
// 					.then(() => {
// 						dispatch('loadCartList')
// 					})
// 					.catch((error) => {
// 						commit('setError', error)
// 					})
// 					.finally(() => {
// 						commit('setLoading', false)
// 					})
// 		},

// 		loadFilteredData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
// 			commit('setError', null)
// 			commit('setLoading', true)
// 			collectionDB
// 					.loadFilteredData(fieldTitle, compareOperator, valueToCompare)
// 					.then((list) => {
// 						commit('setItemsList', list)
// 					})
// 					.catch((error) => {
// 						commit('setError', error)
// 					})
// 					.finally(() => {
// 						commit('setLoading', false)
// 					})
// 		},
// 		addItemToCart({commit}, itemId){
// 			commit('addItemToCartList', itemId)
// 		},
// 	},
// }


