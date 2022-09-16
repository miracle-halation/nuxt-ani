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
						<v-list-item-content>
							<UserMenu	:user="user"></UserMenu>
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