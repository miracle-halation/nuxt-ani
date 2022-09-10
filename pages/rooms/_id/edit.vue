<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">ルーム更新</h1>
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
						<v-select
							v-model="genre"
							:items="items"
							:menu-props="{ top: true, offsetY: true }"
							label="ジャンル"
						></v-select>
						<v-file-input v-model="image" @change="setImage" label="画像" />
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
							<v-btn :disabled="invalid" 	@click="updateRoom">編集</v-btn>
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
			genre: null,
			items: ['アニメ', '漫画', 'ゲーム', '動物', 'スポーツ'],
			private_data: false,
			image: null,
			current_user: null,
		}
	},
	computed:{
		...mapGetters('user', ['user'])
	},
	mounted(){
		this.fetchRoom(),
		this.fetchCurrentUser()
	},
	methods:{
		async fetchRoom(){
			await this.$axios.get(`/v1/rooms/${this.$route.params.id}`)
			.then((response) => {
				const room_data = response.data.data[0]
				this.name = room_data.name
				this.description = room_data.description
				this.private_data = room_data.private
				this.genre = room_data.genre
			})
			.catch((error) => {
				this.$router.push(`/rooms/${this.$route.params.id}`)
			})
		},
		async fetchCurrentUser(){
			await this.$axios.get(`/auth/validate_token`)
			.then((response) => {
				this.current_user = response.data.data
			},
			(error) => {
				console.log(error)
			})
		},
		async submit () {
      this.$refs.observer.validate()
    },
		async setImage(e){
			this.image = e
		},
		async updateRoom(){
			const formData = new FormData()
			formData.append('room[name]', this.name)
			formData.append('room[genre]', this.genre)
			formData.append('room[description]', this.description)
			formData.append('room[private]', this.private_data)
			formData.append('room[leader]', this.current_user.nickname)
			if(this.image){
				formData.append('room[image]', this.image)
			}
			const config = {
				headers: { "Content-Type": "multipart/form-data" }
			}
			await this.$axios.patch(`/v1/rooms/${this.$route.params.id}`, formData, config)
			.then((response) => {
				this.$router.push(`/rooms/${this.$route.params.id}`)
			},
			(error) => {
				this.showMessage({
					message: "更新に失敗しました",
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