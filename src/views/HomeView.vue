<template>
  <div class="container">
    <HelloWorld msg=" Visual Analyzer " />
  </div>
</template>

<script>
import HelloWorld from "../components/PlanView";
//import HelloWorld from "../components/BnbDeal";
/* eslint-disable */ 
  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
<style>
knob-label {
    display: block;
    margin-bottom: 0;
    font-weight: bold;
     color: #febc2c;
}
</style>
