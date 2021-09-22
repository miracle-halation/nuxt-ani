<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">新規ルーム作成</h1>
			</v-card-title>
			<v-card-text>
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form @submit.prevent="submit">
						<ValidationProvider
							v-slot="{ errors }"
							name="ルーム名"
							rules="required"
						>
							<v-text-field
								v-model="name"
								label="ルーム名"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<ValidationProvider
							v-slot="{ errors }"
							name="サブタイトル"
							rules="required"
						>
							<v-text-field
								v-model="subtitle"
								label="サブタイトル"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<v-file-input @change="setImage" label="画像" />
						<v-checkbox
							v-model="private"
							label="非公開にする"
						></v-checkbox>
						<ValidationProvider
							v-slot="{ errors }"
							name="ルーム説明"
							rules="required"
						>
						<v-textarea
							v-model="description"
							label="ルーム説明"
							:error-messages="errors"
							required
							clearable
							clear-icon="mdi-close-circle"
						></v-textarea>
						</ValidationProvider>
						<v-card-actions>
							<v-btn :disabled="invalid" 	@click="createRoom">新規作成</v-btn>
						</v-card-actions>
					</v-form>
				</ValidationObserver>
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script>
export default {
	asyncData(){
		return{
			name:"",
			subtitle: "",
			description: "",
			private: false,
			image: null
		}
	},
	methods:{
		async submit () {
      this.$refs.observer.validate()
    },
		async setImage(e){
			this.image = e
		},
	}
}
</script>

<style scoped>

</style>