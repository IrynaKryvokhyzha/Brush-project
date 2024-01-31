import DbOperations from '../helpers/DBOperations'
const collectionDB = new DbOperations('travelItems')
export default {
	namespaced: true,
	state: () => ({
		travelKitList: [],
		loading: false,
		error: null,
		
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getTravelKitItemsList: (state) => state.travelKitList,
		getKitItemById: (state) => (itemId) => state.travelKitList.find((item) => item.id == itemId),


	},
	mutations: {
		setItemsList(state, itemsList) {
			state.travelKitList = itemsList
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadTravelKitList({ commit }) {
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
						dispatch('loadTravelKitList')
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
						dispatch('loadTravelKitList')
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
						dispatch('loadTravelKitList')
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


