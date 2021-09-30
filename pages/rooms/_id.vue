<template>
	<div>
    ID is {{ $route.params.id }}
		{{room}}
  </div>
</template>

<script>
export default {
	asyncData(){
		return{
			room: null
		}
	},
	mounted(){
		this.fetchRoom()
	},
	methods:{
		async fetchRoom(){
			await this.$axios.get('/v1/rooms', this.$route.params.id)
			.then((response) => {
				this.room = response.data.data
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
}
</script>

<style scoped>

</style>