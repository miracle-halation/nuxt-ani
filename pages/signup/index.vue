<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">新規登録</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field label="ユーザ名" />
					<v-text-field label="メールアドレス" />
					<v-text-field label="パスワード" />
					<v-text-field label="パスワード確認" />
					<v-file-input label="アイコン" />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn>新規登録</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style scoped>

</style>