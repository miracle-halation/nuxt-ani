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
      <!-- 自分の所属するルームを表示or傾向によるおすすめ表示 -->
      <v-row><h1>人気のルーム</h1></v-row>
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            v-for="room in this.favorite_rooms"
            :key="room.id"
          >
            <v-row
              no-gutters
              class="test"
              v-if="`${room.private}` === 'false'"
            >
              <nuxt-link :to="`/rooms/${room.id}`">
                <v-card
                  class="mx-auto"
                  max-width="340"
                >
                  <v-img
                    :src="`${room.image_path}`"
                    height="200px"
                  ></v-img>
                  <v-card-title>
                    {{room.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{room.description}}
                  </v-card-subtitle>
                </v-card>
              </nuxt-link>
            </v-row>
          </v-slide-item>
        </v-slide-group>

      <!-- ここに最新のルームを表示 -->
        <v-row><h1>最新ルーム</h1></v-row>
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            v-for="room in this.rooms_data"
            :key="room.id"
          >
            <v-row
              no-gutters
              class="test"
              v-if="`${room.private}` === 'false'"
            >
              <nuxt-link :to="`/rooms/${room.id}`">
                <v-card
                  class="mx-auto"
                  max-width="340"
                >
                  <v-img
                    :src="`${room.image_path}`"
                    height="200px"
                  ></v-img>
                  <v-card-title>
                    {{room.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{room.description}}
                  </v-card-subtitle>
                </v-card>
              </nuxt-link>
            </v-row>
          </v-slide-item>
        </v-slide-group>

        <!-- ここにワンクリック検索用の画像をはる -->
      <v-row><h1>ジャンル</h1></v-row>
      <v-row no-gutters >
          <v-card
            v-for="(genre, index) in genres"
            :key="index"
            class="mx-auto"
            max-width="300"
          >
            <nuxt-link :to="`/rooms/search?query=${genre}`">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
              <v-card-title>
                {{genre}}
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
      favorite_rooms: null,
      search: null,
      genres: [
        'ゲーム',
        'アニメ',
        '漫画',
        'カメラ',
        'スポーツ',
        '旅',
        'プラモデル',
        '小説',
        'イラスト'
      ]
		}
	},
  mounted(){
    this.fetchRooms()
  },
  methods:{
    fetchRooms(){
      this.$axios.get('v1/rooms')
      .then((response) => {
        this.rooms_data = response.data.data[0]
        this.favorite_rooms = response.data.data[1]
      })
      .catch((error) => {
        console.log(error)
      })
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