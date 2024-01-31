<template>
		<main>
			<section class="login__container">
				<form class="login__item item">
					<h1 class="item__header">{{$t('loginTitles.login')}}</h1>
					<h2 class="item__sign-in"> {{$t('loginTitles.doesntHaveAnAccount')}} <button class="login-button-underlined" @click="onSignUp">{{ $t('loginTitles.signUp') }}</button></h2>
					<span class="item__message">{{message}}</span>
					<label>
						{{ $t('loginTitles.email') }}
						<input v-model="email" type="email" :placeholder="$t('loginTitles.email')" autocomplete="on" >
					</label>
					<label>
						{{ $t('loginTitles.password') }}
						<input v-model="password" type="password" :placeholder="$t('loginTitles.password')" autocomplete="on">
					</label>
					<button class="item__button button" @click="onLogin" :disabled='!isDataValid'> {{ $t('loginTitles.login') }}</button>
					<span>{{ $t('loginTitles.or') }}</span>
					<button class="item__button button google-button" @click="onLoginWithGoogle" > {{ $t('loginTitles.loginWithGoogle') }} </button>
					<button class="item__button button" @click="onHome">{{$t('loginTitles.home') }}</button>
				</form>
			</section>
		</main>
</template>

<script>
import { mapActions } from 'vuex'
	export default {
		name:'LoginPage',
		data() {
			return {
				email: '',
				password: '',
				message: ''
			}
		},
		computed: {
			isDataValid() {
				return this.email && this.password
			}
		},
		methods: {
			...mapActions('auth',['loginWithGoogle','signInWithWithEmailAndPassword']),
			onLoginWithGoogle(){
				this.loginWithGoogle()
				this.$router.push({
					name: 'home'
				})
			},
			onHome(){
				this.$router.push({
					name: 'home'
				})
			},
			onSignUp(){
				this.$router.push({
					name: 'sign-up'
				})
			},

			validateEmail(email){
			return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
		  },
		  validatePassword(password){
			return password.length >= 6
		  },
		  
			onLogin() {
				if (!this.validateEmail(this.email)){
				this.message = this.$t('errorMessages.enterValidEmail')
			}
			else if	(!this.validatePassword(this.password)){
				this.message = this.$t('errorMessages.sixDigitsPasswordRequired')
			}
			else {
				this.message = ''
			this.signInWithWithEmailAndPassword({email: this.email, password: this.password})
			.then(() => {
				
				// this.$router.push({
				// 	name: 'home'
				// })
			})
			}
			},  
		},
	}
</script>

<style lang="scss" scoped>

input{
	border: 1px solid #6b6a6a;
	border-radius: 5px;
}
.item__google-button{
	

}
.icon{
	background-image: url('@/images/google.svg');
	background-size: 25px 25px;
	background-position: 5px 5px;
	z-index: 5;
}


</style>