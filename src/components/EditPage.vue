<template> 
  <div class="feed">
    <h2>The Edit Page!</h2>
    <p>{{text}}</p>
  </div>
</template>


<script>
import moment from 'moment';
 export default {
   name: 'EditPage',
   created: function() {
     
   },
   computed: {
     text: function() {
        return this.$route.query.text;
     }
   },
   watch: {
     
   },
 }
</script>

<style scoped>
 
</style>