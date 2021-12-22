<template>
	<!-- 公開用プロフィールをここに表示する。本人なら、編集ボタンなどを表示する -->
	<v-row justify="center">
    <v-col
      cols="12"
      sm="8"
			class="user_info"
    >
			<v-img
				:src="`${user.user.icon_path}`"
				height="200px"
			></v-img>
			<v-card>
				<v-tabs
					v-model="tab"
					background-color="deep-purple accent-4"
					centered
					dark
					icons-and-text
				>
					<v-tabs-slider></v-tabs-slider>

					<v-tab href="#tab-1">
						Profile
						<v-icon>mdi-phone</v-icon>
					</v-tab>

					<v-tab href="#tab-2">
						Favorites
						<v-icon>mdi-heart</v-icon>
					</v-tab>

					<v-tab href="#tab-3">
						Friends
						<v-icon>mdi-account-box</v-icon>
					</v-tab>

					<v-tab href="#tab-4">
						Approval pending
						<v-icon>mdi-account-box</v-icon>
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item value="tab-1">
						<v-card>
							<v-card-title class="cyan darken-1">
								<span class="text-h5 white--text">{{user.user.nickname}}</span>

								<v-spacer></v-spacer>

								<nuxt-link :to="`/user/${user.user.id}/edit`">
									<v-btn
										dark
										icon
									>
										<v-icon>mdi-pencil</v-icon>
									</v-btn>
								</nuxt-link>

								<v-btn
									dark
									icon
									@click="deleteUser()"
								>
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</v-card-title>

							<v-list>
								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-email</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>{{user.user.email}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider inset></v-divider>

								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-map-marker</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>{{user.user.address}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider inset></v-divider>

								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-message-text</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>{{user.user.myinfo}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>

						</v-card>
					</v-tab-item>
					<v-tab-item value="tab-2">
						<v-list v-for="(tag, index) in tags" :key="index">
							<v-list-item>

								<v-list-item-content>
									<v-list-item-title>{{tag}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-tab-item>
					<v-tab-item value="tab-3">
						<v-list v-for="(friend, index) in friends" :key="index">
							<v-list-item v-if="friend.accept">
								<v-list-item-action>
									<img :src="`${friend.icon_path}`" class="user-image">
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>{{friend.nickname}}</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-btn @click="deleteFriend(friend.id, index)">解除する</v-btn>
								</v-list-item-action>
							</v-list-item>
						</v-list>
					</v-tab-item>
					<v-tab-item value="tab-4">
						<v-list v-for="(friend, index) in pending_friends" :key="index">
							<v-list-item v-if="friend.accept === 0">
								<v-list-item-action>
									<img :src="`${friend.icon_path}`"  class="user-image">
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>{{friend.nickname}}</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-btn @click="approvalUser(friend.id, index)">承認する</v-btn>
								</v-list-item-action>
								<v-list-item-action>
									<v-btn @click="deleteFriend(friend.id, index)">拒否する</v-btn>
								</v-list-item-action>
							</v-list-item>
						</v-list>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	middleware({store, params, redirect}){
		const user = store.getters['user/user']
		const auth = store.getters['user/isLoggedIn']
		if(!auth || user.user.id != params.id){
			return redirect('/rooms')
		}
	},
	asyncData () {
		return {
			tags: [],
			friends: [],
			pending_friends: null,
			tab: null
		}
	},
	computed:{
		...mapGetters('user', ['user'])
	},
	mounted(){
    this.fetchTags(),
		this.fetchFriends()
  },
	methods:{
		async fetchTags(){
			await this.$axios.get(`/v1/tags/${this.$route.params.id}`)
				.then((response) => {
					const tags = response.data.data
					for(let i=0;i<tags.length;i++){
						this.tags.push(tags[i]['name'])
					}
				},
				(error) => {
					console.log(error)
				})
		},
		async fetchFriends(){
			await this.$axios.get(`/v1/friends/${this.$route.params.id}`)
			.then((response) => {
				this.friends = response.data.data[0]
				this.pending_friends = response.data.data[1]
			},
			(error) =>{
				console.log(error)
			})
		},
		async deleteUser(){
			confirm('ユーザーを削除します。本当によろしいですか？')
			await this.$axios.delete(`/auth`, {data:{id:this.$route.params.id}})
			.then((response) => {
				this.showMessage({
					message: "削除に成功しました",
					type: "green",
					status: true
				})
				this.logout()
				this.$router.go('/login')
			},
			(error) => {
				this.showMessage({
					message: "削除に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		async approvalUser(id, index){
			await this.$axios.post('/v1/friends/approval', {user_id: this.user.user.id, friend_id: id})
			.then((response) => {
				this.friends.push(this.pending_friends[index])
				this.pending_friends.splice(index, 1)
				const result = response.data
				this.showMessage({
					message: result.data,
					type: result.color,
					status: true
				})
			},
			(error) => {
				this.showMessage({
					message: "申請に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		async deleteFriend(id, index){
			await this.$axios.delete(`/v1/friends/${this.$route.params.id}`, {data:{friend_id: id}})
			.then((response) => {
				this.friends.splice(index, 1)
				const result = response.data
				this.showMessage({
					message: result.data,
					type: result.color,
					status: true
				})
			},
			(error) => {
				this.showMessage({
					message: "解除に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		...mapActions('flashMessage', ['showMessage']),
		...mapActions('user', ['logout'])
	}
}
</script>

<style scoped>

	a{
		text-decoration: none;
	}

	.user_info{
		margin-top: 3rem;
	}

  .user-image{
    border-radius: 50%;
    width:  50px;
    height: 50px;
    margin: 1rem 1rem;
  }

</style>