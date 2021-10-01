<template>
	<v-row no-gutters justify="space-between">
		<v-card
			class="mx-auto"
			max-width="300"
			tile
		>
			<v-list dense>
				<v-list-item-title class="list-title">Test</v-list-item-title>
				<v-list-item-group>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text>taaaaetete</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text>tagsgfsrgfaaaetete</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-action-text>taaaaeteteだgぜ</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>

		<v-col class="chat-space">
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
						v-for="(item, i) in items"
						:key="i"
					>
						<v-list-item-avatar>
            	<v-img src="https://picsum.photos/id/11/500/300"></v-img>
          	</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-action-text v-text="item.text"></v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</v-row>

</template>

<script>
export default {
	asyncData(){
		return{
			room: null,
			users: null,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
		}
	},
	mounted(){
		this.fetchRoom()
	},
	methods:{
		async fetchRoom(){
			await this.$axios.get(`/v1/rooms/${this.$route.params.id}`)
			.then((response) => {
				this.room = response.data.data[0]
				this.users = response.data.data[1][0]
			})
			.catch((error) => {
				console.log(error)
			})
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
	background: #ffffff;
}

.mx-auto{
	width: 100%;
}

.list-title{
	margin-left: 10px;
}

</style>