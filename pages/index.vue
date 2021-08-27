<template>
	<v-row no-gutters>
		<v-img
			:width="width"
			src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
			class="test"
		></v-img>
		<v-col
			cols="12"
			class="test2"
		>
			大好きを共有できる仲間を求めて!!
		</v-col>

		<v-card
			v-for="n in 3"
      :key="n"
      :loading="loading"
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


	</v-row>

</template>

<style scoped>
	.test{
		height: 500px;
	}
	.test2{
		text-align: center;
		line-height: 200px;
		font-size: 2rem;
		margin: 10px auto;
	}
	.pa-2{
		height: 200px;
	}
</style>