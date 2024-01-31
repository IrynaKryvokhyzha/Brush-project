import DbOperations from '../helpers/DBOperations'
const collectionDB = new DbOperations('brushItems')
export default {
	namespaced: true,
	state: () => ({
		brushList: [],
		cart: [],
		loading: false,
		error: null,

		
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getBrushList: (state) => state.brushList,
		getBrushById: (state) => (itemId) => state.brushList.find((item) => item.id == itemId),

	},
	mutations: {
		setItemsList(state, itemsList) {
			state.brushList = itemsList
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
		

	},
	actions: {
		loadBrushList({ commit }) {
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
						dispatch('loadBrushList')
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
						dispatch('loadBrushList')
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
						dispatch('loadBrushList')
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


