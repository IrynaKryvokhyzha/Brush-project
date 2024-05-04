<template>
		<div class="main-masterpage">
			<header class="header">
				<div class="header__container">
					<div class="header__menu menu">
						<nav :class="{ 'menu__body--visible':sidebarVisible}" class="menu__body">
							<ul class="menu__list">
								<li class="menu__item"><router-link  to="/"><span class="menu__link">{{$t('menu.home')}}</span></router-link> </li>
								<li class="menu__item"><router-link  :to="{name:'my-shop'}"><span class="menu__link">{{$t('menu.my-shop')}}</span></router-link> </li>
								<li class="menu__item"><router-link  :to="{name:'about'}"><span class="menu__link">{{$t('menu.about')}}</span></router-link></li>
								<li class="menu__item"><router-link  :to="{name:'contact-us'}"><span class="menu__link">{{$t('menu.contact-us')}}</span></router-link></li>
								<!-- <router-link class="menu__item" :to="{name:'users'}"><span class="menu__link">{{$t('menu.users')}}</span></router-link> -->
								<button class="close-menu-list" @click="showSideBar"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
							</ul>
						</nav>
						<button  class="open-menu-list" @click="showSideBar"><font-awesome-icon :icon="['fas', 'bars']" /></button>
					</div>
					
					<div class="header__logo logo">
						<img src="../images/dr.png" alt="logo" class="logo__image">
					</div>
					
					<div class="header__actions actions">
						<div class="actions__language">
							<span class="actions__icon"><font-awesome-icon :icon="['fas', 'globe']" class="search-icon"/></span>
							<button class="button" @click="changeLanguage('en')">En</button>
							<button class="button" @click="changeLanguage('ua')">Ua</button>
						</div>
					</div>
					<div class="header__user user">
						<div v-if="getUser" class="user__item">
							<span v-if="getUser.displayName" class="user__name">{{getUser.displayName}}</span>
							<span v-else class="user__name">{{getUser.email}}</span>
							<span v-if="getUser.photoURL">
								<img :src="getUser.photoURL" alt="user logo" class="user__image">
							</span>
							<button class="button" @click="logout" >{{ $t('loginTitles.logout') }}</button>
						</div>
						<div v-else class="sign__item">
							<a class="user__button"  @click="onLogin" ><font-awesome-icon :icon="['far', 'user']" /></a>
						</div>
						<button  class="open-filter" @click="toSearch"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
						<button class="cart" @click="toCart">
							<font-awesome-icon :icon="['fas', 'cart-shopping']" />
							<span v-if="cartItemCount > 0" class="cart-item-count">{{ cartItemCount }}</span>
						</button>
					</div>
					<div :class="{ 'cart-component--visible':filterVisible}" class="filter-component">
						<brush-filter @close-filter="closeFilter"/>
					</div>

					<div :class="{ 'cart-component--visible':cartVisible}" class="cart-component">
						<cart-component @close-cart="closeCart"/>
					</div>

				</div>
			</header>
			<main class="main">
				<slot></slot>
			</main>
			<div class="currency-selector-component">
				<currency-selector />
			</div>
			<div class="footer-component" >
				<footer-component  />
			</div>

			
	</div>


</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BrushFilter from '@/components/My Shop/IndividualBrushes/BrushFilter.vue';
import CartComponent from '@/components/CartComponent.vue';
import CurrencySelector from '@/components/CurrencySelector.vue'
import FooterComponent from '../components/FooterComponent.vue';

	export default {
		name: 'MainMasterPage',
		components: { BrushFilter, CartComponent, FooterComponent, CurrencySelector },

		data() {
			return {
				sidebarVisible: false,
				cartVisible: false,
				filterVisible: false,
				
			}
		},
		computed: {
			...mapGetters('auth',['getUser']),
			...mapGetters('cartList',['getCartList', 'getItemById']),
			cartItemCount() {
				return this.getCartList.reduce((total, item) => total + item.quantity, 0);
  },
		},
		watch: {
		error(newValue) {
			if (newValue){
				this.$router.push({
				name:'error'
			})
			}
		}
	 },
		created() {
        this.$i18n.locale = localStorage.getItem('lastLanguage') || 'en'
        if (localStorage.getItem('lastLanguage') !== this.$i18n.locale) {
            localStorage.setItem('lastLanguage', this.$i18n.locale)
            //window.dispatchEvent(new Event('storage'))
        }
        const self = this
        window.addEventListener('storage', function () {
            if (self.$i18n.locale !== localStorage.getItem('lastLanguage')) {
                self.$i18n.locale = localStorage.getItem('lastLanguage')
                self.$router.go()
            }
        })
    },
	

    methods: {
		...mapActions('auth',['logout']),
        changeLanguage(lang) {
            this.$i18n.locale = lang
            localStorage.setItem('lastLanguage', this.$i18n.locale)
        },
		  showSideBar(){
			this.sidebarVisible = !this.sidebarVisible
			if (this.sidebarVisible) {
       			 document.body.classList.add('no-scroll');
				} else {
					document.body.classList.remove('no-scroll');
				}
		  },
		  onSignUp(){
			this.$router.push({
				name: 'sign-up'
			})
		  },
		  onLogin(){
			this.$router.push({
				name: 'login'
			})
		  },
		  toSearch(){
			this.filterVisible = true
		  },
		  toCart(){
			this.cartVisible = true
			
			// this.applyScrollStyles()
		  },
		//   Допрацювати блок скролу
		//   applyScrollStyles() {
		// 	if (this.cartVisible) {
		// 	document.body.classList.add('cart-body');
		// 	document.documentElement.classList.add('cart-html');
		// 	} else {
		// 	document.body.classList.remove('cart-body');
		// 	document.documentElement.classList.remove('cart-html');
		// 	}
		// },
		closeFilter(){
			this.filterVisible= false
		},
		closeCart(){
			this.cartVisible= false
		},

		 

    },

	}
</script>

<style lang="scss" scoped>

.main-masterpage{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding-top: 100px;
	@media (max-width: 767.98px) {
		padding-top: 50px;
	}
}
.header{

}
.main {
position: relative;
	height: 100%;
	flex: 1 0 auto;
	flex-grow: 1;

		}


.sign__item{
	align-self: center;
	display: flex;
	gap: 5px;
}

.text-center{
	z-index: 5;
}
.currency-selector-component{
	position: fixed;
	bottom: 50px;
	left: 10px;
	color: gray;
	z-index: 999;
}
.footer-component{

	margin-top: auto;
 }
 .cart {
	align-self: center;
	padding-left: 10px;
	position: relative; 
 }
 
 .cart-item-count {
	position: absolute;
	top: -8px;
	right: -8px;
	background-color: red;
	color: white;
	border-radius: 50%;
	padding: 4px;
	font-size: 12px;
 }
</style>