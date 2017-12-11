<template>
  <div>
    <img src="./images/star36_on@2x.png" alt="" v-for="on in ons">
    <img src="./images/star36_half@2x.png" alt="" v-for="half in halfs">
    <img src="./images/star36_off@2x.png" alt="" v-for="off in offs">
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    props: ['info'],
    data() {
      return {
        ons: [],
        halfs: [],
        offs: [],
        score: ''
      }
    },
    created() {
      this.star();
    },
    methods: {
      star() {
        let IntScore = parseInt(this.info / 1);
        let FloatScore = this.info % 1;
        var n;
        if (FloatScore != 0) {
          if (FloatScore < 0.5) {
            this.offs.push(0);
            n = 5 - IntScore - 1;
          } else {
            this.halfs.push(0);
          }
          ;
        } else {
          n = 5 - IntScore;
        }

        for (let i = 0; i < IntScore; i++) {
          this.ons.push(i);
        }
        ;

        for (let j = this.offs.length; j < n; j++) {
          this.offs.push(j);
        }
        ;
      }
    }
  }


</script>
<style>
</style>
