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
						<vue-simple-suggest
							v-model="user_name"
							:list="src_users"
							:filter-by-query="true"
							class="text-color"
							>
						</vue-simple-suggest>
						<v-btn @click="AddUsers">ユーザーを追加する</v-btn>
						<div class="users-field">
							<div class="text-center" v-for="(user, index) in users" :key="index">
								<v-chip
									class="ma-2"
									close
									@click:close="RemoveUser(index)"
								>
									{{user}}
								</v-chip>
							</div>
						</div>
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
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' 

export default {
	middleware: 'authenticated',
	components: {
    VueSimpleSuggest
  },
	asyncData(){
		return{
			name:"",
			description: "",
			private_data: false,
			image: null,
			user_name: null,
			users:[],
			src_users:[]
		}
	},
	mounted(){
    this.fetchUsers()
  },
	computed:{
		...mapGetters('user', ['user'])
	},
	methods:{
		async fetchUsers(){
			await this.$axios.get(`/v1/rooms/new`)
			.then((response) => {
				const user_datas = response.data.data
				for(let i=0;i<user_datas.length;i++){
					this.src_users.push(user_datas[i]['nickname'])
				}
			},
			(error) => {
				console.log(error)
			})
		},
		async submit () {
      this.$refs.observer.validate()
    },
		async AddUsers(){
			if(this.user_name !== ""){
				this.users.push(this.user_name)
				this.user_name = ""
			}
		},
		async RemoveUser(index){
			// フレンド機能を実装後、フレンドのみ加えられるようにする
			this.users.splice(index, 1)
		},
		async setImage(e){
			this.image = e
		},
		async createRoom(){
			const formData = new FormData()
			this.users.push(this.user.user.nickname)
			formData.append('room[name]', this.name)
			formData.append('room[description]', this.description)
			formData.append('room[private]', this.private_data)
			formData.append('room[leader]', this.user.user.nickname)
			formData.append('user_ids', this.users)
			if(this.image){
				formData.append('room[image]', this.image)
			}
			const config = {
				headers: { "Content-Type": "multipart/form-data" }
			}
			await this.$axios.post('/v1/rooms', formData, config)
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
	.users-field{
		display: flex;
		flex-wrap: wrap;
	}

	.text-color{
		color: black;
	}

</style>