import Cookie from 'universal-cookie'
const cookies = new Cookie()

export default function({ $axios, store }) {
  $axios.onRequest(config => {
		config.headers.client = cookies.get("client")
    config.headers["access-token"] = cookies.get("access-token")
    config.headers.uid = cookies.get("uid")
    config.headers["token-type"] = cookies.get("token-type")
		config.headers["Content-Type"] = "multipart/form-data"
    store.dispatch('loading/incrementLoadingCount')
  })

  $axios.onResponse(response => {
    if (response.headers['access-token']) {
      cookies.remove('access-token')
      cookies.remove('client')
      cookies.remove('uid')
      cookies.remove('token-type')
			cookies.set('access-token', response.headers["access-token"], {maxAge: 86400})
			cookies.set('client', response.headers.client, {maxAge: 86400})
			cookies.set('uid', response.headers.uid, {maxAge: 86400})
			cookies.set('token-type', response.headers["token-type"], {maxAge: 86400})
    }
    store.dispatch('loading/decrementLoadingCount')
  })

  $axios.onError(e => {
    store.dispatch('loading/decrementLoadingCount')
  })
}