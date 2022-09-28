<template>
  <v-progress-linear
    :active="isLoading"
    :indeterminate="isLoading"
    :height="loadingHeight"
    absolute
    bottom
    :color="loadingColor" />
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Loading',
    data () {
      return {
        loadingHeight: '5',
        loadingColor: '#4DB6AC'
      }
    },
    computed: {
      ...mapGetters({
        isLoading: 'loading/isLoading'
      })
    }
  }
</script>
