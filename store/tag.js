export const state = () => ({
	tags: null
})

export const getters = {
	tags: (state) => state.tags
}

export const mutations = {
	setTags(state, {tags}){
		state.tags = tags
	},

	removeTags(state){
		state.tags = null
	}
}

export const actions = {
	async loginUserTags({commit}, {id}){
		await this.$axios.get(`/v1/tags/${id}`)
		.then((response) => {
			const tags = response.data.data
			commit('setTags', {tags})
		},
		(error) => {
			console.log(error)
		})
	},
	async logoutUserTags({commit}){
		commit('removeTags')
	}
}