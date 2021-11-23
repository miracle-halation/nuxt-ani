<template>
	<v-row no-gutters justify="space-between">
		<DetailMenu :room="this.room" :users="this.users" :current_user="this.user.user"></DetailMenu>

		<v-col
			class="chat-space"
		>
			<div
				v-for="(chat, index) in this.messages"
				:key="index"
			>
				<v-col class="chat"
					v-if="`${chat.user_id}` === `${user.user.id}`"
				>
					<template>
						<v-row justify="center">
							<v-dialog
								v-model="dialog"
								persistent
								max-width="600px"
							>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									class="mx-2"
									fab
									dark
									x-small
									color="cyan"
									v-bind="attrs"
          				v-on="on"
									@click="openDialog(chat.id, index)"
								>
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
							</template>
								<v-card>
									<v-card-title>
										<span class="text-h5">編集</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12">
													<v-text-field
														v-model="new_message"
														type="text"
														required
													></v-text-field>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="blue darken-1"
											text
											@click="closeDialog()"
										>
											閉じる
										</v-btn>
										<v-btn
											color="blue darken-1"
											text
											@click="updateMessage()"
										>
											更新
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-row>
					</template>
					<v-btn
						class="mx-2"
						fab
						dark
						x-small
						color="cyan"
						@click="deleteMessage(chat.id, index)"
					>
						<v-icon dark>
							mdi-delete
						</v-icon>
					</v-btn>
					<div class="my-balloon6">
						<div class="chatting">
							<div class="mycomment">
								<p>{{chat.content}}</p>
							</div>
						</div>
					</div>
					<div class="user_info">
						<img :src="`${chat.icon_path}`" class="user-image">
						<p>{{user.user.nickname}}</p>
					</div>
				</v-col>
				<v-col class="chat"
					v-else
				>
					<div class="user_info">
						<img :src="`${chat.icon_path}`" class="user-image">
						<p>{{user.user.nickname}}</p>
					</div>
					<div class="balloon6">
						<div class="chatting">
							<div class="says">
								<p>{{chat.content}}</p>
							</div>
						</div>
					</div>
				</v-col>
			</div>
			<v-form class="message_field">
				<v-text-field
					v-model="message"
					label="Message"
				></v-text-field>
				<v-btn @click="createMessage">投稿</v-btn>
			</v-form>
		</v-col>

		<v-card
			class="mx-auto"
			max-width="300"
			tile
		>
			<v-list dense>
				<v-list-item-title class="list-title">所属ユーザー</v-list-item-title>
				<v-list-item-group>
					<v-list-item
						v-for="(user, i) in users"
						:key="i"
					>
						<v-list-item-avatar>
            	<v-img src="https://picsum.photos/id/11/500/300"></v-img>
          	</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-action-text v-text="user.nickname"></v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</v-row>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import DetailMenu from '@/components/room/DetailMenu.vue'

export default {
	middleware: 'authenticated',
	components:{
		DetailMenu
	},
	asyncData(){
		return{
			room: [],
			users: [],
			messages: [],
			message: null,
			update_id: null,
			new_message:null,
			update_messages:null,
			dialog: false,
		}
	},
	computed:{
		...mapGetters('user', ['user', 'icon'])
	},
	created(){
		if (process.client) {
			const ActionCable = require('actioncable')
			const cable = ActionCable.createConsumer('ws://localhost:8000/cable');
			this.messageChannel = cable.subscriptions.create( "RoomChannel",{
				received: (data) => {
					this.messages.push(data.message.message)
				}
			})
		}
	},
	mounted(){
		this.fetchRoom()
	},
	methods:{
		async fetchRoom(){
			await this.$axios.get(`/v1/rooms/${this.$route.params.id}`)
			.then((response) => {
				const room_data = response.data.data[0]
				this.room['id'] = room_data.id
				this.room['name'] = room_data.name
				this.room['description'] = room_data.description
				this.room['leader'] = room_data.leader
				this.room['private'] = room_data.private
				this.users = response.data.data[1]
				this.messages = response.data.data[2]
			})
			.catch((error) => {
				this.$router.push('/rooms')
			})
		},
		async deleteRoom(){
			if(this.user.user.nickname === this.room.leader){
				await this.$axios.delete(`/v1/rooms/${this.$route.params.id}`)
				.then((response) => {
					this.$router.push('/rooms')
				})
				.catch((error) => {
					this.$router.push('/rooms')
				})
			}
		},
		async joinUser(){
			const result = this.users.some((ele) => ele.id === this.user.user.id)
			if(!result){
				const room_id = this.room['id']
				const user_id = this.user.user.id
				await this.$axios.post(`/v1/rooms/${room_id}/join`, {user_id:user_id})
				.then((response) => {
					this.$router.go(`/rooms/${room_id}`)
				})
				.catch((error) => {
					this.showMessage({
						message: "加入処理に失敗しました",
						type: "red",
						status: true
					})
				})
			}else{
				this.showMessage({
					message: "加入処理に失敗しました",
					type: "red",
					status: true
				})
			}
		},
		async departUser(){
			const result = this.users.some((ele) => ele.id === this.user.user.id)
			if(result){
				const room_id = this.room['id']
				const user_id = this.user.user.id
				await this.$axios.post(`/v1/rooms/${room_id}/depart`, {user_id: user_id})
				.then((response) => {
					this.$router.go('/rooms')
				})
				.catch((error) => {
					this.showMessage({
						message: "脱退処理に失敗しました",
						type: "red",
						status: true
					})
				})
			}else{
				this.showMessage({
					message: "脱退処理に失敗しました",
					type: "red",
					status: true
				})
			}
		},
		async createMessage(){
			const formData = new FormData()
			formData.append('message[content]', this.message)
			formData.append('message[user_id]', this.user.user.id)
			formData.append('message[room_id]', this.room.id)
			await this.$axios.post(`/v1/messages`, formData)
			.then((response) => {
				this.messageChannel.perform('speak',{
					message: response.data.data
				})
				this.message = null
			})
			.catch((error) => {
				this.showMessage({
						message: "メッセージの作成に失敗しました",
						type: "red",
						status: true
					})
			})
		},
		async openDialog(chat_id, index){
			this.update_id = chat_id
			this.update_messages = index
		},
		async closeDialog(){
			this.update_id = null
			this.dialog = false
		},
		async updateMessage(){
			const formData = new FormData()
			formData.append('message[content]', this.new_message)
			formData.append('message[user_id]', this.user.user.id)
			formData.append('message[room_id]', this.room.id)
			await this.$axios.patch(`/v1/messages/${this.update_id}`, formData)
			.then((response) => {
				this.messages[this.update_messages]['content'] = response.data.data.content
				this.new_message = null
				this.update_messages = null
				this.dialog = false
			})
			.catch((error) => {
				this.showMessage({
					message: "メッセージの更新に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		async deleteMessage(delete_message, index){
			await this.$axios.delete(`/v1/messages/${delete_message}`)
				.then((response) => {
					this.messages.splice(index, 1)
				})
				.catch((error) => {
					this.showMessage({
						message: "メッセージの削除に失敗しました",
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

h1{
	margin-bottom: 1rem;
}

.chat-space{
	height: 100vh;
	width: 100%;
	background: #333333;
	overflow: scroll;
	-ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-space::-webkit-scrollbar {
    display:none;
}

.mx-auto{
	width: 100%;
}

.list-title{
	margin-left: 10px;
}

.chat{
	display: flex;
	align-items:center;
}

.user-image{
	border-radius: 50%;
	width:  50px;
	height: 50px;
	margin: 1rem 2rem;
}

.balloon6 .my-balloon6 {
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
}

.balloon6 .chatting {
  width: 100%;
  text-align: left;
}

.my-balloon6{
	width: 100%;
  text-align: right;
}

.says {
  display: inline-block;
  position: relative;
  margin: 0 0 0 0.5rem;
  padding: 10px;
  max-width: 25％;
  border-radius: 12px;
  background: #edf1ee;
	color: #000000;
}

.says:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 15px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #edf1ee;
  -webkit-transform: rotate(50deg);
  transform: rotate(35deg);
}
.says p {
  margin: 0;
  padding: 0;
}

.mycomment {
  margin: 10px 0;
}
.mycomment p {
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 25％;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;
}

.mycomment p:after {
  content: "";
  position: absolute;
  top: 9px;
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #30e852;
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
}

.message_field{
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.user_info{
	text-align: center;
}

.user_info img{
	margin-bottom: 0;
}

</style>