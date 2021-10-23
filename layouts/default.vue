<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="!clipped"
      :mobile-breakpoint="mobile_breakpoint"
      fixed
      app
    >
    <!-- のちにチャットルームを表示するかも -->
      <v-list v-if="!isLoggedIn">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, i) in login_items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <img :src="icon" class="user-image">
      <v-btn v-show="isLoggedIn" color="green" @click="handleLogout">ログアウト</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="main-container" fluid>
        <FlashMessage></FlashMessage>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FlashMessage from "~/components/FlashMessage.vue"

export default {
  components:{
    FlashMessage: FlashMessage
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'SignUp',
          to: '/signup'
        }
      ],
      login_items: [
        {
          icon: 'mdi-apps',
          title: 'トップへ',
          to: '/rooms'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '新規ルーム作成',
          to: '/rooms/new'
        }
      ],
      miniVariant: false,
      mobile_breakpoint: 1904,
      title: 'オリジナルアプリ'
    }
  },
  computed:{
    ...mapGetters('user', ['user','isLoggedIn', 'icon'])
	},
  methods:{
    async handleLogout(){
      await this.logout()
      this.$router.push('/login')
    },
    ...mapActions('user', ['logout'])
  }
}
</script>

<style scoped>
  .main-container{
    padding: 0 !important;;
  }
  .user-image{
    border-radius: 50%;
    width:  50px;
    height: 50px;
    margin-right: 2rem;
  }
</style>