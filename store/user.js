import Cookie from 'universal-cookie'

const config = {
	headers: { "Content-Type": "multipart/form-data" }
}
const cookies = new Cookie()

export const state = () => ({
	user: null,
	isLoggedIn: false
})

export const getters = {
	user: (state) => state.user,
	isLoggedIn: (state) => state.isLoggedIn
}

export const mutations = {
	setUser(state, { user }){
		state.user = user
		state.isLoggedIn = true
	},
	logoutUser(state){
		state.user = null
		state.isLoggedIn = false
		cookies.remove('user')
	}
}

export const actions = {
	async login({commit}, {data}){
		const res_data = await this.$axios.post('/auth/sign_in', data)
		const user = res_data.data.data
		if(!user){
			throw new Error('Invalid User')
		}else{
			cookies.set('user', {user})
			commit('setUser', {user})
		}
	},
	async signUp({commit}, {data}){
		const res_data = await this.$axios.post('/auth', data, config)
		const user_data = res_data.data
		const user = user_data.data
		if(user_data.status != "success"){
			throw new Error('Failed create user')
		}else{
			cookies.set('user', {user})
			commit('setUser', {user})
		}
	},
	async logout({commit}){
		commit('logoutUser')
	}
}