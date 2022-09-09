import Cookie from 'universal-cookie'

const config = {
	headers: { "Content-Type": "multipart/form-data" }
}
const cookies = new Cookie()

export const state = () => ({
	user: null,
	user_id: null,
	isLoggedIn: false,
	icon: null
})

export const getters = {
	user: (state) => state.user,
	user_id: (state) => state.user_id,
	isLoggedIn: (state) => state.isLoggedIn,
	icon: (state) => state.icon
}

export const mutations = {
	setUser(state, { user_id, icon }){
		state.user_id = user_id
		state.isLoggedIn = true
		state.icon = icon
		cookies.set('user_id', user_id, {maxAge: 86400})
		cookies.set('isLoggedin', true, {maxAge: 86400})
		cookies.set('icon', icon, {maxAge: 86400})
	},
	logoutUser(state){
		state.user_id = null
		state.isLoggedIn = false
		state.icon = null
		cookies.remove('user_id')
		cookies.remove('isLoggedin')
		cookies.remove('icon')
	},
}

export const actions = {
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/auth/sign_in', data)
		.then((response) => {
			const res_data = response
			const user = res_data.data.data
			const user_id = user.id
			const icon = res_data.data.icon_path
			commit('setUser', {user_id, icon})
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
				const user_id = user.id
				const icon = response.data.icon_path
				commit('setUser', {user_id, icon})
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