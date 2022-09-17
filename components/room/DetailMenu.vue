<template>
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
						<v-list-item-action-text>{{room.genre}}</v-list-item-action-text>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-action-text>{{room.description}}</v-list-item-action-text>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-action-text v-if="`${room.private}` === 'true'">プライベート</v-list-item-action-text>
						<v-list-item-action-text v-else>パブリック</v-list-item-action-text>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					v-if="!users.some((ele) => ele.id === Number(this.current_user)) && `${room.private}` === 'false'"
				>
					<v-btn
						depressed
						color="primary"
						@click="joinUser"
					>
						加入申請
					</v-btn>
				</v-list-item>
				<v-list-item v-if="`${this.current_user}` === `${room.leader}`">
					<nuxt-link :to="room.id + '/edit'">
					<v-btn
						depressed
						color="success"
					>
						編集
					</v-btn>
					</nuxt-link>
				</v-list-item>
				<v-list-item v-if="`${this.current_user}` === `${room.leader}`">
					<v-btn
						depressed
						color="error"
						@click="deleteRoom"
					>
						ルーム削除
					</v-btn>
				</v-list-item>
				<v-list-item
					v-if="users.some((ele) => ele.id === Number(this.current_user))"
				>
					<v-btn
						depressed
						color="error"
						@click="departUser"
					>
						脱退
					</v-btn>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	props:{
		room: Array,
		users: Array,
		current_user: String
	},
	methods:{
		async deleteRoom(){
			if(this.current_user === this.room.leader){
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
			const result = this.users.some((ele) => ele.id === Number(this.current_user))
			if(!result){
				const formData = new FormData()
				const room_id = this.room['id']
				formData.append('user_id', this.current_user)
				await this.$axios.post(`/v1/rooms/${room_id}/join`, formData)
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
					message: "既に加入しています",
					type: "red",
					status: true
				})
			}
		},
		async departUser(){
			const result = this.users.some((ele) => ele.id === Number(this.current_user))
			if(result){
				const formData = new FormData()
				const room_id = this.room['id']
				formData.append('user_id', this.current_user)
				await this.$axios.post(`/v1/rooms/${room_id}/depart`, formData )
				.then((response) => {
					this.$router.push('/rooms')
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
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>

<style scoped>

h1{
	margin-bottom: 1rem;
}

.list-title{
	margin-left: 10px;
}

</style>