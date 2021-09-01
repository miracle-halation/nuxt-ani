<template>
	<v-app>
		<v-card>
			<v-card-title>
				<h1 class="display-1">ログイン</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field label="ニックネーム" />
					<v-text-field label="パスワード" />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn>ログイン</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default ({

})
</script>

<style scoped>

</style>