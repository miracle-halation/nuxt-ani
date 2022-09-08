import Cookie from 'universal-cookie'

export default ({req, store}) => {
	if(process.browser){
		return
	}
	const cookies = new Cookie(req.headers.cookie)
	const isLoggedin = cookies.get('isLoggedin')
	const user = cookies.get('user')
	const icon = cookies.get('icon')
	if(isLoggedin){
		store.commit('user/setUser', {user, icon})
	}
}