import Cookie from 'universal-cookie'

export default ({req, store}) => {
	if(process.browser){
		return
	}
	const cookies = new Cookie(req.headers.cookie)
	const user_id = cookies.get('user_id')
	const isLoggedin = cookies.get('isLoggedin')
	const icon = cookies.get('icon')
	if(isLoggedin){
		store.commit('user/setUser', {user_id, icon})
	}
}