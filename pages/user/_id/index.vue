<template>
	<!-- 公開用プロフィールをここに表示する。本人なら、編集ボタンなどを表示する -->
	<v-row justify="center">
    <v-col
      cols="12"
      sm="8"
			class="user_info"
    >
			<v-img
				src="https://picsum.photos/700?image=996"
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
						Favorites Rooms
						<v-icon>mdi-heart</v-icon>
					</v-tab>

					<v-tab href="#tab-3">
						Friends
						<v-icon>mdi-account-box</v-icon>
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item value="tab-1">
						<v-card>
							<v-card-title class="cyan darken-1">
								<span class="text-h5 white--text">Sarah Mcbeal</span>

								<v-spacer></v-spacer>

								<v-btn
									dark
									icon
								>
									<v-icon>mdi-chevron-left</v-icon>
								</v-btn>

								<v-btn
									dark
									icon
								>
									<v-icon>mdi-pencil</v-icon>
								</v-btn>

								<v-btn
									dark
									icon
								>
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</v-card-title>

							<v-list>
								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-phone</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>(650) 555-1234</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon>mdi-message-text</v-icon>
									</v-list-item-action>
								</v-list-item>

								<v-divider inset></v-divider>

								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-phone</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>(323) 555-6789</v-list-item-title>
									</v-list-item-content>

									<v-list-item-action>
										<v-icon>mdi-message-text</v-icon>
									</v-list-item-action>
								</v-list-item>

								<v-divider inset></v-divider>

								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-email</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>mcbeal@example.com</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider inset></v-divider>

								<v-list-item>
									<v-list-item-action>
										<v-icon>mdi-map-marker</v-icon>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>Orlando, FL 79938</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>

						</v-card>
					</v-tab-item>
					<v-tab-item value="tab-2">
						<v-list>
							<v-list-item>
								<v-list-item-action>
									<v-icon>mdi-phone</v-icon>
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>(650) 555-1234</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-icon>mdi-message-text</v-icon>
								</v-list-item-action>
							</v-list-item>
						</v-list>
					</v-tab-item>
					<v-tab-item value="tab-3">
						<v-list>
							<v-list-item>
								<v-list-item-action>
									<v-icon>mdi-phone</v-icon>
								</v-list-item-action>

								<v-list-item-content>
									<v-list-item-title>(650) 555-1234</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-icon>mdi-message-text</v-icon>
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
export default {
	asyncData () {
		return {
			tab: null
		}
	},
}
</script>

<style scoped>

	.user_info{
		margin-top: 3rem;
	}

</style>