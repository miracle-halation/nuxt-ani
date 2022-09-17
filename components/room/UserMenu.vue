<template>
<v-card
  class="mx-auto"
  max-width="300"
  tile
  >
  <v-list dense>
    <v-list-item-title class="list-title">所属ユーザー</v-list-item-title>
    <v-list-item-group>
      <v-list-item
        v-for="(user, i) in users"
        :key="i"
      >
        <v-list-item-content>
          <v-row justify="center">
            <img :src="`${user.icon_path}`" class="user-image" @click.stop="dialog = true">
            <v-list-item-content
              class="user-list"
              @click.stop="dialog = true"
            >
              {{user.nickname}}
            </v-list-item-content>

            <v-dialog
              v-model="dialog"
              max-width="700"
            >
              <v-card>
                <v-card-title class="text-center justify-center py-6">
                  <img :src="`${user.icon_path}`" class="user-image">
                  <h1 class="font-weight-bold text-h2 basil--text">
                    {{user.nickname}}
                  </h1>
                </v-card-title>
                <v-card-subtitle class="apply" v-if="friends.includes(user.nickname) || user.id === Number(current_user)">
                </v-card-subtitle>
                <v-card-subtitle class="apply" v-else>
                  <v-btn color="green" class="friend-apply" @click="applyFriend(user.id)">
                    フレンド申請
                  </v-btn>
                </v-card-subtitle>

                <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  grow
                >
                  <v-tab>自己紹介</v-tab>
                  <v-tab>お気に入り</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>{{user.myinfo}}</v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-for="(tag, index) in tags" :key="index">
                    <v-card flat>
                      <v-card-text>{{tag}}</v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-dialog>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</v-card>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
		props:{
			users: Array,
      friends: Array,
      current_user: String,
		},
    data () {
      return {
        dialog: false,
        tags: ["test"],
        tab: null
      }
    },
    methods:{
      async fetchTags(user_id){
        this.tags = []
        await this.$axios.get(`/v1/tags/${user_id}`)
        .then((response) => {
          const tags = response.data.data
          for(let i=0;i<tags.length;i++){
            this.tags.push(tags[i]['name'])
          }
          console.log(this.tags);
        },
        (error) => {
          console.log(error)
        })
		  },
      async applyFriend(id){
        const formData = new FormData()
				formData.append('user_id', this.current_user)
        formData.append('friend_id', id)
        await this.$axios.post('/v1/friends/apply', formData)
        .then((response) => {
          const result = response.data
          this.showMessage({
						message: result.data,
						type: result.color,
						status: true
					})
        },
        (error)=>{
          this.showMessage({
						message: "フレンド申請に失敗しました",
						type: "red",
						status: true
					})
        }
        )
      },
      ...mapActions('flashMessage', ['showMessage']),
    }
  }
</script>

<style scoped>
  .user-list{
    height: 5rem;
  }
  .user-image{
    border-radius: 50%;
    width:  50px;
    height: 50px;
    margin: 1rem 1rem;
  }
  .apply{
    display: flex;
    justify-content: center;
  }
  .friend-apply{
    margin-top: 1rem;
  }
  .basil--text {
    color: #356859 !important;
  }
</style>