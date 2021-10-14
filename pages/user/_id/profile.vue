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
							rules="max:50"
						>
							<v-text-field
								v-model="address"
								label="居住地域"
								placeholder="例)日本 東京"
								:counter="50"
								:error-messages="errors"
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
							rules="max:300"
						>
							<v-textarea
								v-model="my_info"
								label="自己紹介"
								:counter="300"
								:error-messages="errors"
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
export default {
	asyncData(){
		return {
			address: "",
			tag_name: "",
			tags: [],
			my_info: ""
		}
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

		}
	}
}
</script>

<style scoped>
	.tags-field{
		display: flex;
		flex-wrap: wrap;
	}

</style>