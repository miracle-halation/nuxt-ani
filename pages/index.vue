<template>
	<v-row no-gutters>
		<v-img
			src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
			class="test"
		></v-img>
		<v-col
			cols="12"
			class="test2"
		>
			<h1>大好きを共有できる仲間を求めて!!</h1>
		</v-col>

		<v-card
			v-for="n in 3"
      :key="n"
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
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>Cafe Badilico</v-card-title>
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