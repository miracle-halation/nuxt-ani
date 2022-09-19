<template>
	<v-row no-gutters>
		<v-img
			:src="require(`@/assets/images/top.jpg`)"
			class="test"
		></v-img>
		<v-col
			cols="12"
			class="test2"
		>
			<h1>大好きを共有できる仲間を求めて!!</h1>
		</v-col>

		<v-card
			v-for="(data, index) in cardDatas"
      :key="index"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="250"
        :src="data.image"
      ></v-img>
      <v-card-title>{{data.title}}</v-card-title>
			<v-card-text>{{data.description}}</v-card-text>
    </v-card>

		<v-col
			cols="12"
			class="test3"
		>
			<h2>さあ！　始めよう！！</h2>
			<v-btn
				size="x-large"
				color="success"
				class="btn-test"
			>
				新規会員登録
			</v-btn>
		</v-col>

	</v-row>

</template>

<script>
export default {
	data: () => ({
		cardDatas:[
			{
				'title': 'ルームを作成',
				'description': '同じ趣味同士で語り合おう',
				'image': require("@/assets/images/des1.jpg")
			},
			{
				'title': 'フレンドになろう',
				'description': '同じ趣味の仲間を作っていこう',
				'image': require("@/assets/images/des2.jpg")
			},
			{
				'title': '仲間たちと最高の思い出を！',
				'description': '同じ趣味の仲間を作って充実の趣味ライフを！',
				'image': require("@/assets/images/des3.jpg")
			}
		]
	}),
}
</script>

<style scoped>
	.test{
		height: 500px;
	}
	.test2{
		text-align: center;
		line-height: 200px;
		margin: 10px auto;
	}
	.test3{
		text-align: center;
		margin: 10px auto;
	}
	.pa-2{
		height: 200px;
	}
	.btn-test{
		margin-top: 30px;
		font-weight: bold;
	}
</style>