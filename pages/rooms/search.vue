<template>
  <v-container
    class="fill-height"
    fluid
    style="min-height: 434px"
  >
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
          <nuxt-link to="/rooms/search?query=${search}">検索</nuxt-link>
        </v-btn>
      </v-container>
    </v-form>
    <h1>検索結果</h1>
      <v-row>
        <v-col
          v-for="room in this.rooms"
          :key="room.id"
          class="d-flex child-flex"
          cols="4"
        >
          <nuxt-link :to="`/rooms/${room.id}`">
            <v-card>
              <v-img
                src="https://picsum.photos/350/165?random"
                max-height="125"
                class="grey darken-4"
              ></v-img>
              <v-card-title class="text-h6">
                {{room.name}}
              </v-card-title>
              <v-card-text>
                {{room.description}}
              </v-card-text>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import is_login from '~/middleware/is_login'
export default {
	asyncData(){
		return{
			rooms: null,
      search: null
		}
	},
	mounted(){
		this.searchRooms()
	},
	methods:{
		searchRooms(){
			this.$axios.post(`/v1/rooms/search`,{data: this.$route.query.query})
			.then((response) => {
				this.rooms = response.data.data
        console.log(this.rooms);
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
}
</script>

<style scoped>
  .search_result{
    display: flex;
    justify-content: space-around;
  }
</style>