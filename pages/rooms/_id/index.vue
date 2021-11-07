<template>
	<v-row no-gutters justify="space-between">
		<v-card
			class="mx-auto"
			max-width="300"
			tile
		>
			<v-list dense >
				<v-list-item-title class="list-title">{{room.name}}</v-list-item-title>
				<v-list-item-group>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text>{{room.description}}</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text>{{room.leader}}</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text v-if="`${room.private}`">パブリック</v-list-item-action-text>
							<v-list-item-action-text v-else>プライベート</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-btn
							depressed
							color="primary"
						>
							加入申請
						</v-btn>
					</v-list-item>
					<v-list-item v-if="`${user.user.nickname}` === `${room.leader}`">
						<nuxt-link :to="room.id + '/edit'">
						<v-btn
							depressed
							color="success"
						>
							編集
						</v-btn>
						</nuxt-link>
					</v-list-item>
					<v-list-item v-if="`${user.user.nickname}` === `${room.leader}`">
						<v-btn
							depressed
							color="error"
							@click="deleteRoom"
						>
							ルーム削除
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn
							depressed
							color="error"
						>
							脱退
						</v-btn>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>

		<v-col class="chat-space">
			<v-col class="chat">
				<img  :src="icon" class="user-image">
				<div class="balloon6">
					<div class="chatting">
						<div class="says">
							<p>左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし</p>
						</div>
					</div>
				</div>
			</v-col>
			<v-col class="chat">
				<img  :src="icon" class="user-image">
				<div class="balloon6">
					<div class="chatting">
						<div class="says">
							<p>左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし</p>
						</div>
					</div>
				</div>
			</v-col>
			<v-col class="chat">
				<img  :src="icon" class="user-image">
				<div class="balloon6">
					<div class="chatting">
						<div class="says">
							<p>左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし文左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし左ふきだし</p>
						</div>
					</div>
				</div>
			</v-col>
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
import {mapGetters} from 'vuex'

export default {
	middleware: 'authenticated',
	asyncData(){
		return{
			room: {},
			users: null,
		}
	},
	computed:{
		...mapGetters('user', ['user', 'icon'])
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
			}else{

			}
		}
	}
}
</script>

<style scoped>

h1{
	margin-bottom: 1rem;
}

.chat-space{
	height: 650px;
	width: 100%;
	background: #333333;
}

.mx-auto{
	width: 100%;
}

.list-title{
	margin-left: 10px;
}

.chat{
	display: flex;
}

.user-image{
	border-radius: 50%;
	width:  50px;
	height: 50px;
	margin: 1rem 2rem;
}

.balloon6 {
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
}

.balloon6 .chatting {
  width: 100%;
  text-align: left;
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
  top: 20px;
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

</style>