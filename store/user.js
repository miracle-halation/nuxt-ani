const config = {
	headers: { "Content-Type": "multipart/form-data" }
}


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
	}
}

export const actions = {
	async login({commit}){
		const user = await this.$axios.post('/auth/sign_in')
		if(!user) throw new Error('Invalid User')
		commit('setUser', user)
	},
	async signUp({commit}, {data}){
		const res_data = await this.$axios.post('/auth', data, config)
		const user_data = res_data.data
		const user = user_data.data
		if(user_data.status != "success") throw new Error('Failed create user')
		commit('setUser', {user})
	}
}