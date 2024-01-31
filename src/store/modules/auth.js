import { auth } from '@/firebase-config.js'
import { GoogleAuthProvider, signInWithPopup, signInWithCredential, signOut, getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword } from 'firebase/auth'

export default {
    namespaced: true,
    state: {
        user: null,
        loading: false,
        error: null,
		  message: null
    },
    getters: {
		getUser: (state) => state.user,
		getMessage: (state) => state.message,

		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.error = error
        },
	 },
    actions: {
        async saveLoginUserData({ commit, dispatch }, loginResult) {
            console.log('loginResult')
            console.log(loginResult)
            //--------- user data -------
            const user = loginResult?.user // об'єкт користувача
            commit('setUser', user)
            //user.displayName - ім'я акаунту
            //user.photoURL - аватар акаунту
            //user.email - електронна адреса акаунту
            //--------- user access token -------
            // This gives you a Google Access Token. You can use it to access the Google API.
            let credential = GoogleAuthProvider.credentialFromResult(loginResult)
				
            localStorage.setItem('authCredential', JSON.stringify(credential))
				dispatch('users/loadUserPermissions', user.uid, { root: true })
            
        },
        loginWithGoogle({ commit, dispatch }) {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
                .then((loginResult) => {
                    dispatch('saveLoginUserData', loginResult)
                })
                .catch((error) => {
                    commit('setError', error)
                })
        },


		signUpWithWithEmailAndPassword({ commit, dispatch }, { email, password , errorMessage}) {
			  if (!email || !password) 
				 throw new Error('Email and password are required.')
				else{
			  const auth = getAuth();
			  createUserWithEmailAndPassword(auth, email, password)
			  .then((loginResult) => {
					commit('setUser', loginResult?.user)
					dispatch('saveLoginUserData', loginResult)
				})
			  .catch ((error)=> {
				console.error('Sign-in error:', error.message);
			 	 commit('setError', error)
				  errorMessage = '❌ A user with this email already exists. Please try to sign in or use another email.'
				 alert(errorMessage);
				})
			}
	  },

		 async signInWithWithEmailAndPassword({ commit, dispatch }, { email, password, errorMessage }) {
			try {
		 
			  const auth = getAuth();
			  const loginResult = await signInWithEmailAndPassword(auth, email, password);
			  // Викликайте commit для збереження даних в store
			  commit('setUser', loginResult?.user);
			  // Викликайте dispatch для виклику інших actions
			  dispatch('saveLoginUserData', loginResult);
			  return loginResult;
			} catch (error) {
			  // Handle specific error cases if needed
			  console.error('Sign-in error:', error.message);
			  // Викликайте commit або dispatch для відображення помилки в store чи в інших частинах програми
			  commit('setError', error)
			  errorMessage = '❌ No user with this email. Please try again or sign up.'
			  alert(errorMessage);
			}
		 },

        async loginWithCredential({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                let credential = localStorage.getItem('authCredential')

                if (credential) {
                    credential = JSON.parse(credential)

                    credential = GoogleAuthProvider.credential(credential.idToken)

                    signInWithCredential(auth, credential)
                        .then((loginResult) => {
                            dispatch('saveLoginUserData', loginResult)
                            resolve(loginResult)
                        })
                        .catch((error) => {
                            console.log(error)
                            commit('setError', error)
                            // Handle Errors here.
                            //var errorCode = error.code
                            //var errorMessage = error.message
                            // The email of the user's account used.
                            //var email = error.email
                            reject(false)
                        })
                } else resolve(false)
            })
        },

        logout({ commit, dispatch }) {
            signOut(auth)
                .then(() => {
                    localStorage.removeItem('authCredential')
                    commit('setUser', null)
                })
                .catch((error) => {
                    commit('setError', error)
						  dispatch('users/clearPermissions', null, { root: true })
                })
        },
    },
}
