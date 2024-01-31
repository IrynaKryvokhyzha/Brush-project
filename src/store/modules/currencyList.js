import DbOperations from '../helpers/DBOperations'
const collectionDB = new DbOperations('currencyList')
export default {
    namespaced: true,
    state: () => ({
		currencyRateList: [],
		loading: false,
		error: null,
		currencyRate: 1,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getCurrencyRateList: (state) => state.currencyRateList,
        getItemById: (state) => (itemId) => state.currencyRateList.find((item) => item.id == itemId),

		  getCurrencyTitle: (state) => (state.currencyRate === 1 ? '$' : 'грн'),
		  getCurrentPrice: (state) => (price) => (price* state.currencyRate).toFixed(2),
		  getCurrencyRate: (state) => state.currencyRate
    },
    mutations: {
        setItemsList(state, itemsList) {
            state.currencyRateList = itemsList
        },
		  setCurrencyRate(state, value){
			state.currencyRate = value
		},
        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        loadCurrencyRateList({ commit }) {
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
		//   updateCurrencyRate({ commit, dispatch }, { itemId }) {
		// 	commit('setError', null)
		// 	commit('setLoading', true)

		// 	collectionDB
		// 			.updateItem(itemId)
		// 			.then((itemId) => {
		// 				dispatch('setCurrencyRate', itemId)
		// 			})
		// 			.catch((error) => {
		// 				commit('setError', error)
		// 			})
		// 			.finally(() => {
		// 				commit('setLoading', false)
		// 			})
		// },
		updateCurrencyRate({commit}, currency){
			commit('setCurrencyRate', currency)
		},
        addItem({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadCurrencyRateList')
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
                    dispatch('loadCurrencyRateList')
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
                    dispatch('loadCurrencyRateList')
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


