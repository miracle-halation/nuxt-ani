<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">新規登録</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field v-model="nickname" label="ニックネーム" />
					<v-text-field v-model="email" label="メールアドレス" />
					<v-text-field v-model="password" label="パスワード"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
					 />
					<v-text-field v-model="password_confirm" label="パスワード確認"
						:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
					 />
					<v-file-input @change="setImage" label="アイコン" />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn @click="handleSignUp">新規登録</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Cookie from 'universal-cookie'

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
		async setImage(e){
			this.icon = e
		},
		async handleSignUp(){
			const formData = new FormData();
			const cookies = new Cookie()
			formData.append('nickname', this.nickname)
			formData.append('email', this.email)
			formData.append('password', this.password)
			formData.append('icon', this.icon)
			await this.signUp({data: formData})
			cookies.set('user', JSON.stringify(this.user))
			this.$router.push('/')
		},
		...mapActions('user', ['signUp'])
	}
}
</script>

<style scoped>

</style>