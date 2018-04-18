<template> 
  <div class="feed">
    <h2>The Edit Page!</h2>
    <form v-on:submit.prevent="save">
      <p>Name a new deck</p>
      <input class="narrow" v-model="newname" placeholder="New Name">
      <button type="submit">Save</button>
    </form>
  </div>
</template>


<script>
 export default {
   name: 'EditPage',
   data () {
      return {
        newname: '',
      }
   },
  methods:{
    save: function(){
      this.$store.dispatch('addDeck', {
        title: this.newname,
      });
      this.$router.push({path: '/'});
    },
  },
 }
</script>

<style scoped>
 
</style>