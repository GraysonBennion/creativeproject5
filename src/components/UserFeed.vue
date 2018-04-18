<template>
  <div>
  <button v-on:click="edit">New Deck</button>
  <div class="feed">
    <div class="deck" v-for="item in feed">
      <img src="/static/box.png" class="box">
      <p>{{item.title}}</p>
      <button class="remover" v-on:click="deleteDeck(item)">Delete</button>
    </div>
  </div>
  </div>
</template>


<script>
  export default {
    name: 'UserFeed',
    data () {
      return {
        
      }
    },
    created: function() {
      this.$store.dispatch('getFeed');
    },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
   },
   methods: {
    edit: function(){
      this.$router.push({path: '/edit'});
    },
    deleteDeck: function(data){
      this.$store.dispatch('deleteDeck', data);
      this.$store.dispatch('getFeed');
    }

   },
 }
</script>

<style scoped>
  .deck {

  }
  img {
    width: 100px;
  }
 .remover{
    
 }
 .feed {
  display:flex;
  flex-wrap:wrap;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
</style>