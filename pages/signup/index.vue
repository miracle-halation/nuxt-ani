<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">新規登録</h1>
			</v-card-title>
			<v-card-text>
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form @submit.prevent="submit">
						<ValidationProvider
							v-slot="{ errors }"
							name="ニックネーム"
							rules="required|max:10"
						>
							<v-text-field
								v-model="nickname"
								label="ニックネーム"
								:counter="10"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
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
							vid="password"
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
						<ValidationProvider
							v-slot="{ errors }"
							name="パスワード"
							rules="required|confirmed:password"
						>
							<v-text-field
								v-model="password_confirm"
								label="パスワード確認"
								:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show2 ? 'text' : 'password'"
								@click:append="show2 = !show2"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<v-file-input @change="setImage" label="アイコン" />
						<v-card-actions>
							<v-btn :disabled="invalid" @click="handleSignUp">新規登録</v-btn>
						</v-card-actions>
					</v-form>
				</ValidationObserver>
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
	asyncData(){
		return {
			nickname: "",
			email: "",
			password: "",
			password_confirm: "",
			icon: null,
			show1: false,
			show2: false
		}
	},
	computed:{
		...mapGetters(['user'])
	},
	methods: {
		async submit () {
      this.$refs.observer.validate()
    },
		async setImage(e){
			this.icon = e
		},
		async handleSignUp(){
			const formData = new FormData();
			formData.append('nickname', this.nickname)
			formData.append('email', this.email)
			formData.append('password', this.password)
			formData.append('icon', this.icon)
			await this.signUp({data: formData})
		},
		...mapActions('user', ['signUp'])
	}
}
</script>

<style scoped>

</style>