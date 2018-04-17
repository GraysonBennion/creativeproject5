<template> 
  <div class="feed">
    <h2 v-if="feed.length === 0">No Decks!</h2>
    <div v-else v-for="item in feed" class="item">
      <img src="/static/box.png" class="box">
      <p class="title">{{item.title}}</p>
    </div>
  </div>
</template>


<script>
  import moment from 'moment';
  export default {
    name: 'UserFeed',
    data () {
      return {
        text: '',
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
   }
 }
</script>

<style scoped>
 .feed {
     width: 600px;
 }
 .tweetForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .tweet {
     margin-top: 0px;
 }
 .idline {
     margin-bottom: 0px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
 .time {
     float: right;
     color: #666;
 }
</style>