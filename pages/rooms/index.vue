<template>
  <div>
    <v-container>
      <v-form>
        <v-container>
          <v-text-field v-model="search">
            <template v-slot:label>
                ルームを検索する<v-icon style="vertical-align: middle">
                mdi-file-find
              </v-icon>
            </template>
          </v-text-field>
          <v-btn>
            <nuxt-link :to="`/rooms/search?query=${search}`">検索</nuxt-link>
          </v-btn>
        </v-container>
      </v-form>

      <!-- ここにワンクリック検索用の画像をはる -->
      <v-row><h1>ジャンルを選択する</h1></v-row>
      <v-row no-gutters >
          <v-card
            v-for="(genre, index) in genres"
            :key="index"
            class="mx-auto"
            max-width="300"
          >
            <nuxt-link :to="`/rooms/search?query=${genre.name}`">
              <v-img
                :src="genre.image"
                height="200px"
              ></v-img>
              <v-card-title>
                {{genre.name}}
              </v-card-title>
            </nuxt-link>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
	asyncData(){
		return{
      model: null,
      rooms_data: null,
      search: null,
      genres:[
        {
          'name': 'ゲーム',
          'image': require("@/assets/images/src/game.jpg")
        },
        {
          'name': 'アニメ',
          'image': require("@/assets/images/src/anime.jpg")
        },
        {
          'name': '漫画',
          'image': require("@/assets/images/src/comic.jpg")
        },
        {
          'name': 'カメラ',
          'image': require("@/assets/images/src/camera.jpg")
        },
        {
          'name': 'スポーツ',
          'image': require("@/assets/images/src/sports.jpg")
        },
        {
          'name': '旅',
          'image': require("@/assets/images/src/trip.jpg")
        },
        {
          'name': 'プラモデル',
          'image': require("@/assets/images/src/model.jpg")
        },
        {
          'name': '小説',
          'image': require("@/assets/images/src/novel.jpg")
        },
        {
          'name': 'イラスト',
          'image': require("@/assets/images/src/ilustration.jpg")
        },
      ]
		}
	}
}
</script>

<style scoped>

h1{
  margin: 2rem auto;
}

a{
  text-decoration: none;
  color: #ffffff;
}

.mx-auto{
  margin: 2rem;
  padding: 2rem;
}

.pa-4{
  margin-bottom: 7rem;
}

@media screen and (max-width: 959px) {
	.test{
    margin-left: 1.5rem;
    margin-right: 3.5rem;
    width: 100%;
  }
}
@media screen and (max-width: 480px) {

}

</style>