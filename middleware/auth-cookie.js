import Cookie from 'universal-cookie'

export default ({req, store}) => {
	if(process.browser){
		return
	}
	const cookies = new Cookie(req.headers.cookie)
	const user = cookies.get('user')
	const icon = cookies.get('icon')
	if(user){
		store.commit('user/setUser', {user, icon})
	}
}