import DbOperations from '../helpers/DBOperations'
const collectionDB = new DbOperations('shopList')
export default {
	namespaced: true,
	state: () => ({
		shopsList: [],
		loading: false,
		error: null,
		
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getShopList: (state) => state.shopsList,
		getItemById: (state) => (itemId) => state.shopsList.find((item) => item.id == itemId),


	},
	mutations: {
		setItemsList(state, itemsList) {
			state.shopsList = itemsList
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadShopList({ commit }) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
					.loadItemsList()
					.then((list) => {
						commit('setItemsList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},

		addItem({ commit, dispatch }, item) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
					.addItem(item)
					.then(() => {
						dispatch('loadShopList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},
		deleteItem({ commit, dispatch }, itemId) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
					.deleteItem(itemId)
					.then(() => {
						dispatch('loadShopList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},
		updateItem({ commit, dispatch }, { itemId, data }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
					.updateItem(itemId, data)
					.then(() => {
						dispatch('loadShopList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},

		loadFilteredData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
					.loadFilteredData(fieldTitle, compareOperator, valueToCompare)
					.then((list) => {
						commit('setItemsList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},
	},
}


