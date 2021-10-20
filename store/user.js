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
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/auth/sign_in', data)
		.then((response) => {
			const res_data = response
			const user = res_data.data.data
			cookies.set('user', {user}, {maxAge: 86400})
			commit('setUser', {user})
			dispatch("flashMessage/showMessage", {
				message: "ログインしました",
				type: "green",
				status: true
			}, {root:true})
			this.$router.go('/rooms')
		},
		(error) => {
			dispatch("flashMessage/showMessage", {
				message: "ログインに失敗しました",
				type: "red",
				status: true
			}, {root:true})
		})
	},
	async signUp({commit, dispatch}, {data}){
		await this.$axios.post('/auth', data, config)
			.then((response) => {
				const user = response.data.data
				cookies.set('user', {user}, {maxAge: 86400})
				commit('setUser', {user})
				dispatch("flashMessage/showMessage", {
					message: "新規作成しました",
					type: "green",
					status: true
				}, {root:true})
				this.$router.go('/rooms')
			},
			(error) => {
				dispatch("flashMessage/showMessage", {
					message: "作成に失敗しました",
					type: "red",
					status: true
				}, {root:true})
			})
	},
	async logout({commit, dispatch}){
		commit('logoutUser')
		dispatch("flashMessage/showMessage", {
			message: "ログアウトしました",
			type: "green",
			status: true
		}, {root:true})
	}
}