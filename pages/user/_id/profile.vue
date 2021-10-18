<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">プロフィール変更</h1>
			</v-card-title>
			<v-card-text>
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
				>
					<v-form @submit.prevent="submit">
						<ValidationProvider
							v-slot="{ errors }"
							name="居住地域"
							rules="required|max:50"
						>
							<v-text-field
								v-model="address"
								label="居住地域"
								placeholder="例)日本 東京"
								:counter="50"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<ValidationProvider
							v-slot="{ errors }"
							name="お気に入り作品"
							rules="max:50"
						>
								<v-text-field
									v-model="tag_name"
									label="お気に入り作品"
									:counter="50"
									:error-messages="errors"
								/>
								<v-btn @click="AddTags">お気に入りを追加する</v-btn>
								<div class="tags-field">
									<div class="text-center" v-for="(tag, index) in tags" :key="index">
										<v-chip
											class="ma-2"
											close
											@click:close="RemoveTag(index)"
										>
											{{tag}}
										</v-chip>
									</div>
								</div>
						</ValidationProvider>
						<ValidationProvider
							v-slot="{ errors }"
							name="自己紹介"
							rules="required|max:300"
						>
							<v-textarea
								v-model="myinfo"
								label="自己紹介"
								:counter="300"
								:error-messages="errors"
								required
							/>
						</ValidationProvider>
						<v-card-actions>
							<v-btn :disabled="invalid" @click="UpdateProfile">プロフィールを更新する</v-btn>
						</v-card-actions>
					</v-form>
				</ValidationObserver>
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	asyncData(){
		return {
			address: "",
			tag_name: "",
			tags: [],
			myinfo: ""
		}
	},
	computed:{
		...mapGetters('user', ['user'])
	},
	methods:{
		async submit () {
      this.$refs.observer.validate()
    },
		async AddTags(){
			if(this.tag_name !== ""){
				this.tags.push(this.tag_name)
				this.tag_name = ""
			}
		},
		async RemoveTag(index){
			this.tags.splice(index, 1)
		},
		async UpdateProfile(){
			const formData = new FormData()
			formData.append('address', this.address)
			formData.append('myinfo', this.myinfo)
			formData.append('tags', this.tags)
			formData.append('id', this.user.user.id)
			await this.$axios.patch(`/auth/`, formData)
			.then((response) => {
				this.$router.push('/rooms')
			},
			(error) => {
				this.showMessage({
					message: "作成に失敗しました",
					type: "red",
					status: true
				})
			})
		},
		...mapActions('flashMessage', ['showMessage'])
	}
}
</script>

<style scoped>
	.tags-field{
		display: flex;
		flex-wrap: wrap;
	}

</style>