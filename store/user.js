import Cookie from 'universal-cookie'

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
		const cookies = new Cookie()
		state.user = user
		state.isLoggedIn = true
		cookies.set('user', user)
	}
}

export const actions = {
	async login({commit}, {data}){
		const res_data = await this.$axios.post('/auth/sign_in', data)
		const user = res_data.data.data
		if(!user){
			throw new Error('Invalid User')
		}else{
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
			commit('setUser', {user})
		}
	}
}