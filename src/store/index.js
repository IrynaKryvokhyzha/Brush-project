import { createStore } from "vuex";
import brushItems from './modules/brushItems';
import currencyList from "./modules/currencyList";
import shopList from "./modules/shopList";
import procreateItems from "./modules/procreateItems";
import cartList from "./modules/cartList";
import travelItems from "./modules/travelItems";
import auth from './modules/auth'
import users from './modules/users'

export default createStore({
	namespaced: true,
  state: {

  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
	auth,
	brushItems,
	currencyList,
	shopList,
	procreateItems,
	cartList,
	travelItems,
	users
  },
});
