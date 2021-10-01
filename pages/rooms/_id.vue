<template>
	<v-row no-gutters justify="space-between">
			<v-card
				class="mx-auto"
				max-width="300"
				tile
			>
				<v-list dense>
					<v-subheader>REPORTS</v-subheader>
					<v-list-item-group>
						<v-list-item
							v-for="(item, i) in items"
							:key="i"
						>
							<v-list-item-icon>
								<v-icon v-text="item.icon"></v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
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
					<v-subheader>REPORTS</v-subheader>
					<v-list-item-group>
						<v-list-item
							v-for="(item, i) in items"
							:key="i"
						>
							<v-list-item-icon>
								<v-icon v-text="item.icon"></v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
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
				this.room = response.data.data
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

</style>