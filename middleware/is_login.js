export default async ({store, redirect}) => {
	const auth = store.getters['user/isLoggedIn']
	if(auth){
		return redirect('/rooms')
	}
}