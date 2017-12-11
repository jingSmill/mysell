<template>
  <div class="shop">
    <span class="icon-remove_circle_outline cli" @click="subFoods" v-if="food.cont!=undefined&&food.cont>0"></span>
    <span class="num" v-if="food.cont!=undefined&&food.cont>0">{{food.cont}}</span>
    <span class="icon-add_circle cll" @click="addFoods"></span>
  </div>
</template>
<script>
  import Vue from 'vue';

  export default {
    props: ['food'],
    created() {

    },
    methods: {
      addFoods() {
        if (!this.food.cont) {
          Vue.set(this.food, 'cont', 1);
        } else {
          this.food.cont++;
        }
      },
      subFoods() {
        this.food.cont--;
      }
    }
  }
</script>
<style>
  .shop {
    position: relative;
    height: 0.48rem;
    width: 100%
  }

  .shop span {
    display: block;
    width: 0.48rem;
  }

  .cli {
    color: rgb(0, 60, 220);
    font-size: 0.48rem;
    padding: 0 0.12rem;
    position: absolute;
    left: -0.15rem;
  }

  .cll {
    color: rgb(0, 60, 220);
    font-size: 0.48rem;
    padding: 0 0.12rem;
    position: absolute;
    right: -0.15rem;
  }

  .num {
    color: rgb(147, 153, 159);
    font-size: 0.24rem;
    line-height: 0.48rem;
    position: absolute;
    left: 40%;
    width: 0.3rem;
    text-align: left;
  }
</style>
