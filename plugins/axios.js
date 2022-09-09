import Cookie from 'universal-cookie'
const cookies = new Cookie()

export default function({ $axios }) {
  $axios.onRequest(config => {
		config.headers.client = cookies.get("client")
    config.headers["access-token"] = cookies.get("access-token")
    config.headers.uid = cookies.get("uid")
    config.headers["token-type"] = cookies.get("token-type")
		config.headers["Content-Type"] = "multipart/form-data"
  })

  $axios.onResponse(response => {
    if (response.headers['access-token']) {
			cookies.set('access-token', response.headers["access-token"], {maxAge: 86400})
			cookies.set('client', response.headers.client, {maxAge: 86400})
			cookies.set('uid', response.headers.uid, {maxAge: 86400})
			cookies.set('token-type', response.headers["token-type"], {maxAge: 86400})
    }
  })
}