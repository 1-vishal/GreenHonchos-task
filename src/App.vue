<template>
  <div id="app">
   <KurtaList/>  
  </div>
</template>

<script>

import KurtaList from './components/KurtaList.vue'


export default {
  name: 'App',
  components: {
   KurtaList,   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px;
  max-width: 100%;
}
</style>
