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
				@click="openDialog(chat, index)"
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

<script>
import {mapActions} from 'vuex'

export default {
	props:{
		chat: Number,
		index: Number,
		room: Array,
		current_user: String
	},
	data(){
		return{
			update_id: null,
			new_message: null,
			update_message: null,
			dialog: false,
		}
	},
	methods:{
		async openDialog(chat_id, index){
			this.update_id = chat_id
			this.update_message = index
		},
		async closeDialog(){
			this.dialog = false
		},
		async updateMessage(){
			const formData = new FormData()
			formData.append('message[content]', this.new_message)
			formData.append('message[user_id]', this.current_user)
			formData.append('message[room_id]', this.room.id)
			await this.$axios.patch(`/v1/messages/${this.update_id}`, formData)
			.then((response) => {
				this.$emit('replaceMessage', response.data.data.content, this.update_message)
				this.new_message = null
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
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>