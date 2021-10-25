import Cookie from 'universal-cookie'

const config = {
	headers: { "Content-Type": "multipart/form-data" }
}
const cookies = new Cookie()

export const state = () => ({
	user: null,
	isLoggedIn: false,
	icon: null
})

export const getters = {
	user: (state) => state.user,
	isLoggedIn: (state) => state.isLoggedIn,
	icon: (state) => state.icon
}

export const mutations = {
	setUser(state, { user, icon }){
		state.user = user
		state.isLoggedIn = true
		state.icon = icon
	},
	logoutUser(state){
		state.user = null
		state.isLoggedIn = false
		state.icon = null
		cookies.remove('user')
		cookies.remove('icon')
	},
}

export const actions = {
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/auth/sign_in', data)
		.then((response) => {
			const res_data = response
			const user = res_data.data.data
			const icon = res_data.data.icon_path
			cookies.set('user', {user}, {maxAge: 86400})
			cookies.set('icon', icon, {maxAge: 86400})
			commit('setUser', {user, icon})
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
				const icon = response.data.icon_path
				cookies.set('user', {user}, {maxAge: 86400})
				cookies.set('icon', icon, {maxAge: 86400})
				commit('setUser', {user, icon})
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