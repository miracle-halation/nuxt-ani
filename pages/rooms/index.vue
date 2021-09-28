<template>
  <div>
    <v-container>
      <!-- 自分の所属するルームを表示or傾向によるおすすめ表示 -->
      <v-row><h1>おすすめグループ</h1></v-row>
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            v-for="n in 12"
            :key="n"
          >
            <v-row no-gutters class="test">
              <v-card
                class="mx-auto"
                max-width="340"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>
                <v-card-title>
                  Top western road trips
                </v-card-title>
                <v-card-subtitle>
                  1,000 miles of wonder
                </v-card-subtitle>
              </v-card>
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
            <v-row no-gutters class="test">
              <v-card
                class="mx-auto"
                max-width="340"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>
                <v-card-title>
                  {{room.name}}
                </v-card-title>
                <v-card-subtitle>
                  {{room.description}}
                </v-card-subtitle>
              </v-card>
            </v-row>
          </v-slide-item>
        </v-slide-group>

        <!-- ここにワンクリック検索用の画像をはる -->
      <v-row><h1>ジャンル</h1></v-row>
      <v-row no-gutters >
        <v-card
          v-for="n in 9"
          :key="n"
          class="mx-auto"
          max-width="300"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>
          <v-card-title>
            Top western road trips
          </v-card-title>
          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>
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
      rooms_data: null
		}
	},
  mounted(){
    this.fetchRooms()
  },
  methods:{
    fetchRooms(){
      this.$axios.get('v1/rooms')
      .then((response) => {
        this.rooms_data = response.data.data
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