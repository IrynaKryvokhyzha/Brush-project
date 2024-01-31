<template>
	<main>
		<section class="login__container">
			<form class="login__item item">
				<h1 class="item__header">{{$t('loginTitles.signUp')}}</h1>
				<span class="item__message">{{message}}</span>
				<label>
					{{ $t('loginTitles.email') }}
					<input v-model="email" type="email" :placeholder="$t('loginTitles.email')" autocomplete="on" >
				</label>
				<label>
					{{ $t('loginTitles.password') }}
					<input v-model="password" type="password" :placeholder="$t('loginTitles.password')" autocomplete="on">
				</label>
				<button class="item__button button" @click="registerWithEmailAndPassword" :disabled='!isDataValid'>  {{ $t('loginTitles.signUp') }}</button>
				<span>{{ $t('loginTitles.alreadyAUser') }}? <button @click="onLogin" class="login-button-underlined">{{ $t('loginTitles.login') }}</button></span>
				<button class="item__button button" @click="onHome">{{$t('loginTitles.home') }}</button>
			</form>
		</section>
	</main>
</template>

<script>
import { mapGetters ,mapActions } from 'vuex'

	export default {
		name: 'SignUpPage',
		data() {
			return {
				email: '',
				password: '',
				message: '',
			}
		},
		computed: {
			...mapGetters('auth',['getUser']),
			isDataValid() {
				return this.email && this.password
			},
		},
		methods: {
			...mapActions('auth',[ 'signUpWithWithEmailAndPassword', 'signInWithWithEmailAndPassword']),
			onHome(){
				this.$router.push({
					name: 'home'
				})
			},
			onLogin(){
			this.$router.push({
				name: 'login'
			})
		  },

		  validateEmail(email){
			return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
		  },
		  validatePassword(password){
			return password.length >= 6
		  },


		  registerWithEmailAndPassword() {
			if (!this.validateEmail(this.email)){
				this.message = this.$t('errorMessages.enterValidEmail')
			}
			else if	(!this.validatePassword(this.password)){
				this.message = this.$t('errorMessages.sixDigitsPasswordRequired')
			}
			else {
				this.signUpWithWithEmailAndPassword({email: this.email, password: this.password })
				this.$router.push({
					name: 'home'
					})
			}
		},  
		},
	}
</script>

<style lang="scss" scoped>
form{
	border: 3px solid transparent;;
	padding: 20px 5px;
	border-radius: 10px;
	box-shadow:rgba(197, 212, 200, 0.5) 0px 8px 24px, rgba(175, 203, 180, 0.5) 0px 16px 56px, rgba(168, 236, 179, 0.5) 0px 24px 80px;
}
label{
	align-self: center;

}
input{
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: flex;
	border: 1px solid #6b6a6a;
	border-radius: 5px;
	box-sizing: border-box;

}
</style>