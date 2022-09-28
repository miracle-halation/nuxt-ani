<template>
	<v-row no-gutters justify="space-between">
		<DetailMenu
			:room="this.room"
			:users="this.users"
			:current_user="this.user_id"
		></DetailMenu>

		<MessageField
			:messages="this.messages"
			:current_user="this.user_id"
			:room="this.room"
			:users="this.users"
			v-model="message"
		></MessageField>

		<UserMenu
			:users="users"
			:friends="this.friends"
			:current_user="this.user_id"
		>
		</UserMenu>
	</v-row>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import DetailMenu from '@/components/room/DetailMenu.vue'
import MessageField from '@/components/room/MessageField.vue'
import UserMenu from '@/components/room/UserMenu.vue'

export default {
	middleware: 'authenticated',
	components:{
		DetailMenu,
		MessageField,
		UserMenu
	},
	asyncData(){
		return{
			room: [],
			users: [],
			messages: [],
			message: null,
			friends: []
		}
	},
	computed:{
		...mapGetters('user', ['user_id', 'icon'])
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
				this.room['genre'] = room_data.genre
				this.room['description'] = room_data.description
				this.room['leader'] = room_data.leader
				this.room['private'] = room_data.private
				this.users = response.data.data[1]
				this.messages = response.data.data[2]
				const friend_datas = response.data.data[3]
				for(let i=0;i<friend_datas.length;i++){
					this.friends.push(friend_datas[i]['id'])
				}
				const result = this.users.some((ele) => ele.id === this.user_id)
				if(room_data.private && !result){
					this.$router.push('/rooms')
				}
			})
			.catch((error) => {
				this.$router.push('/rooms')
			})
		},
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>

<style scoped>

.mx-auto{
	width: 100%;
}

.list-title{
	margin-left: 10px;
}

</style>