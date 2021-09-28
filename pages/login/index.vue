<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">ログイン</h1>
			</v-card-title>
			<v-card-text>
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form @submit.prevent="submit">
						<ValidationProvider
							v-slot="{ errors }"
							name="メールアドレス"
							rules="required|email"
						>
							<v-text-field
								v-model="email"
								label="メールアドレス"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<ValidationProvider
							v-slot="{ errors }"
							name="パスワード"
							rules="required|min:6|max:32"
						>
							<v-text-field
								v-model="password"
								label="パスワード"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show1 ? 'text' : 'password'"
								@click:append="show1 = !show1"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<v-card-actions>
							<v-btn :disabled="invalid" 	@click="handleLogin">ログイン</v-btn>
						</v-card-actions>
					</v-form>
				</ValidationObserver>
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default ({
	middleware: 'is_login',
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
		async submit () {
      this.$refs.observer.validate()
    },
		async handleLogin(){
			const formData = new FormData();
			formData.append('email', this.email)
			formData.append('password', this.password)
			await this.login({data: formData})
		},
		...mapActions('user', ['login'])
	}
})
</script>

<style scoped>

</style>