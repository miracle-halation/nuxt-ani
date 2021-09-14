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
      <v-list>
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
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-show="isLoggedIn" color="green" @click="handleLogout">ログアウト</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
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
      miniVariant: false,
      mobile_breakpoint: 1904,
      title: 'オリジナルアプリ'
    }
  },
  computed:{
    ...mapGetters('user', ['isLoggedIn'])
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
