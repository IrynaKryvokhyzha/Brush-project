import DbOperations from '../helpers/DBOperations'
const collectionDB = new DbOperations('proCreateItems')
export default {
	namespaced: true,
	state: () => ({
		procreateList: [],
		loading: false,
		error: null,
		
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,

		getSetItemsList: (state) => state.procreateList,
		getSetItemById: (state) => (itemId) => state.procreateList.find((item) => item.id == itemId),


	},
	mutations: {
		setItemsList(state, itemsList) {
			state.procreateList = itemsList
		},

		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		loadSetList({ commit }) {
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

		addSetItem({ commit, dispatch }, item) {
			commit('setError', null)
			commit('setLoading', true)
			collectionDB
					.addItem(item)
					.then(() => {
						dispatch('loadSetList')
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
						dispatch('loadSetList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
		},
		updateSetItem({ commit, dispatch }, { itemId, data }) {
			commit('setError', null)
			commit('setLoading', true)

			collectionDB
					.updateItem(itemId, data)
					.then(() => {
						dispatch('loadSetList')
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


