<template>
  <v-row justify="center">
    <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" class="user-image" @click.stop="dialog = true">
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
          <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" class="user-image">
          <h1 class="font-weight-bold text-h2 basil--text">
            {{user.nickname}}
          </h1>
        </v-card-title>
        <v-card-subtitle class="apply">
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

          <v-tab-item>
            <v-card flat>
              <v-card-text></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
		props:{
			user: Object,
		},
    data () {
      return {
        dialog: false,
        tab: null,
      }
    },
    computed:{
      ...mapGetters("user",{
        current_user: 'user'
      })
    },
    methods:{
      async applyFriend(id){
        await this.$axios.post('/v1/friends/apply', {user_id: this.current_user.user.id, friend_id: id})
        .then((response) => {
          const result = response.data
          if(result.status === 'SUCCESS'){
            const color = "green"
          }else if(result.status === 'ERROR'){
            const color = "red"
          }
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