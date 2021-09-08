<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">ログイン</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field v-model="email" label="メールアドレス" />
					<v-text-field v-model="password" label="パスワード"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
					 />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn @click="handleLogin">ログイン</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default ({
	asyncData(){
		return {
			email: "",
			password: "",
			show1: false
		}
	},
	computed:{
		...mapGetters(['user'])
	},
	methods: {
		async handleLogin(){
			const formData = new FormData();
			formData.append('email', this.email)
			formData.append('password', this.password)
			await this.login({data: formData})
			this.$router.push('/')
		},
		...mapActions('user', ['login'])
	}
})
</script>

<style scoped>

</style>