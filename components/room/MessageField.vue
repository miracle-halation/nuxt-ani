<template>
	<v-col
		class="chat-space"
	>
		<div
			v-for="(chat, index) in messages"
			:key="index"
		>
			<v-col class="chat"
				v-if="`${chat.user_id}` === `${Number(current_user)}`"
			>
				<MessageModal
					:chat="chat.id"
					:index="index"
					:current_user="current_user"
					:room="room"
					@replaceMessage="updateMessage"
				></MessageModal>
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
					<p>{{chat.nickname}}</p>
				</div>
			</v-col>
			<v-col class="chat"
				v-else
			>
				<div class="user_info">
					<img :src="`${chat.icon_path}`" class="user-image">
					<p>{{chat.nickname}}</p>
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
</template>

<script>
import {mapActions} from 'vuex'
import MessageModal from './MessageModel.vue'

export default {
	props:{
		room: Array,
		messages: Array,
		current_user: String,
		users: Array
	},
	components:{
		MessageModal
	},
	data(){
		return{
			message: null,
		}
	},
	computed:{
		_message:{
			get(){
				return this.message
			},
			set(value){
				this.$emit('input', value)
			}
		}
	},
	created(){
		if (process.client) {
			const ActionCable = require('actioncable')
			const cable = ActionCable.createConsumer('ws://localhost:80/cable');
			this.messageChannel = cable.subscriptions.create( "RoomChannel",{
				received: (data) => {
					this.messages.push(data.message.message)
				}
			})
		}
	},
	methods:{
		async createMessage(){
			const result = this.users.some((ele) => ele.id === Number(this.current_user))
			if(result){
				const formData = new FormData()
				formData.append('message[content]', this.message)
				formData.append('message[user_id]', this.current_user)
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
			}else{
				this.showMessage({
					message: "ルームに所属していないユーザーは投稿できません",
					type: "red",
					status: true
				})
			}
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
		async updateMessage(...args){
			const [content, index] = args
			this.messages[index]['content'] = content
		},
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>

<style scoped>
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