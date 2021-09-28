export default async ({store, route, redirect}) => {
	const auth = store.getters['user/isLoggedIn']
	if(auth){
		return redirect('/rooms')
	}
}