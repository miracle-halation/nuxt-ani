<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">新規ルーム作成</h1>
			</v-card-title>
			<v-card-text>
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form @submit.prevent="submit">
						<ValidationProvider
							v-slot="{ errors }"
							name="ルーム名"
							rules="required"
						>
							<v-text-field
								v-model="name"
								label="ルーム名"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<v-file-input @change="setImage" label="画像" />
						<v-checkbox
							v-model="private_data"
							label="非公開にする"
						></v-checkbox>
						<ValidationProvider
							v-slot="{ errors }"
							name="ルーム説明"
							rules="required"
						>
						<v-textarea
							v-model="description"
							label="ルーム説明"
							:error-messages="errors"
							required
							clearable
							clear-icon="mdi-close-circle"
						></v-textarea>
						</ValidationProvider>
						<v-card-actions>
							<v-btn :disabled="invalid" 	@click="createRoom">新規作成</v-btn>
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
	middleware: 'authenticated',
	asyncData(){
		return{
			name:"",
			description: "",
			private_data: false,
			image: null
		}
	},
	computed:{
		...mapGetters('user', ['user'])
	},
	methods:{
		async submit () {
      this.$refs.observer.validate()
    },
		async setImage(e){
			this.image = e
		},
		async createRoom(){
			const room = {
				'name': this.name,
				'description': this.description,
				'private': this.private_data,
				'leader': this.user.user.nickname,
				'image': this.image
			}
			await this.$axios.post('/v1/rooms', room)
			.then((response) => {
				this.$router.push('/rooms')
			},
			(error) => {
				this.showMessage({
					message: "作成に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>

<style scoped>

</style>